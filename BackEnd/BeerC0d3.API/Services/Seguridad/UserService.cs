﻿using BeerC0d3.API.Dtos.Seguridad;
using BeerC0d3.API.Helpers;
using BeerC0d3.Core.Entities.Seguridad;
using BeerC0d3.Core.Interfaces;
using BeerC0d3.Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BeerC0d3.API.Services.Seguridad
{
    public class UserService : IUserService
    {
        private readonly JWT _jwt;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPasswordHasher<Usuario> _passwordHasher;

        public UserService(IUnitOfWork unitOfWork, IOptions<JWT> jwt,
           IPasswordHasher<Usuario> passwordHasher)
        {
            _jwt = jwt.Value;
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        public async Task<string> RegisterAsync(UserRegisterDto registerDto)
        {
            var usuario = new Usuario
            {
                Nombre = registerDto.Nombre,
                ApellidoMaterno = registerDto.ApellidoMaterno,
                ApellidoPaterno = registerDto.ApellidoPaterno,
                Email = registerDto.Email,
                Username = registerDto.Username,
                Activo = true,
                FechaActivacion = DateTime.Now,
                EmailConfirmado = true,
                FechaRegistro = DateTime.Now
            };

            usuario.Password = _passwordHasher.HashPassword(usuario, registerDto.Password);

            _unitOfWork.CreateTransaction();

            var usuarioExiste = _unitOfWork.Usuarios
                                        .Find(u => u.Username.ToLower() == registerDto.Username.ToLower())
                                        .FirstOrDefault();

            if (usuarioExiste == null)
            {
                //var rolPredeterminado = _unitOfWork.Roles
                //                        .Find(u => u.Nombre == Autorizacion.rol_predeterminado.ToString())
                //                        .First();
                try
                {

                    string[] roles = registerDto.Roles.Split(',');
                    foreach (var rol in roles)
                    {
                        var rolPredeterminado = _unitOfWork.Roles
                                            .Find(u => u.Nombre == rol)
                                            .First();

                        usuario.Roles.Add(rolPredeterminado);
                    }


                   // usuario.Roles.Add(rolPredeterminado);
                    _unitOfWork.Usuarios.Add(usuario);
                    await _unitOfWork.SaveAsync();

                    _unitOfWork.Commit();

                    return $"El usuario  {registerDto.Username} ha sido registrado exitosamente";
                }
                catch (Exception ex)
                {
                    _unitOfWork.Rollback();
                    var message = ex.Message;
                    return $"Error: {message}";
                }
            }
            else
            {
                return $"El usuario con {registerDto.Username} ya se encuentra registrado.";
            }
        }
        public async Task<DatosUsuarioDto> GetTokenAsync(LoginDto model)
        {
            DatosUsuarioDto datosUsuarioDto = new DatosUsuarioDto();
            var usuario = await _unitOfWork.Usuarios
                        .GetByUsernameAsync(model.Username);
            int poId = 0;

            //verificamos si traemos un periodo abierto
            var catDetalle = await _unitOfWork.catalogoDetalle.GetCatDetalleByClaveAsync("ABIERTO");
            var periodo = await _unitOfWork.Periodos.GetByEstatusAsync(catDetalle.Id);
            if(periodo != null)
                poId = periodo.Id;

            if (usuario == null)
            {
                datosUsuarioDto.EstaAutenticado = false;
                datosUsuarioDto.Mensaje = $"No existe ningún usuario con el username {model.Username}.";
                return datosUsuarioDto;
            }

            var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Password, model.Password);

            if (resultado == PasswordVerificationResult.Success)
            {
                datosUsuarioDto.Nombre = string.Format("{0} {1} {2}", usuario.Nombre, usuario.ApellidoPaterno, usuario.ApellidoMaterno);
                datosUsuarioDto.EstaAutenticado = true;
                JwtSecurityToken jwtSecurityToken = CreateJwtToken(usuario);
                datosUsuarioDto.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                datosUsuarioDto.Email = usuario.Email;
                datosUsuarioDto.UserName = usuario.Username;
                datosUsuarioDto.Roles = usuario.Roles
                                                .Select(u => u.Nombre)
                                                .ToList();
                datosUsuarioDto.poAbiertoId = poId;

                if (usuario.RefreshTokens.Any(a => a.IsActive))
                {
                    var activeRefreshToken = usuario.RefreshTokens.Where(a => a.IsActive == true).FirstOrDefault();
                    datosUsuarioDto.RefreshToken = activeRefreshToken.Token;
                    datosUsuarioDto.RefreshTokenExpiration = activeRefreshToken.Expires;
                }
                else
                {
                    var refreshToken = CreateRefreshToken();
                    datosUsuarioDto.RefreshToken = refreshToken.Token;
                    datosUsuarioDto.RefreshTokenExpiration = refreshToken.Expires;
                    usuario.RefreshTokens.Add(refreshToken);
                    _unitOfWork.Usuarios.Update(usuario);
                    await _unitOfWork.SaveAsync();
                }


                return datosUsuarioDto;
            }
            datosUsuarioDto.EstaAutenticado = false;
            datosUsuarioDto.Mensaje = $"Credenciales incorrectas para el usuario {usuario.Username}.";
            return datosUsuarioDto;
        }
        public async Task<DatosUsuarioDto> RefreshTokenAsync(string refreshToken)
        {
            var datosUsuarioDto = new DatosUsuarioDto();

            var usuario = await _unitOfWork.Usuarios
                            .GetByRefreshTokenAsync(refreshToken);

            if (usuario == null)
            {
                datosUsuarioDto.EstaAutenticado = false;
                datosUsuarioDto.Mensaje = $"El token no pertenece a ningún usuario.";
                return datosUsuarioDto;
            }

            var refreshTokenBd = usuario.RefreshTokens.Single(x => x.Token == refreshToken);

            if (!refreshTokenBd.IsActive)
            {
                datosUsuarioDto.EstaAutenticado = false;
                datosUsuarioDto.Mensaje = $"El token no está activo.";
                return datosUsuarioDto;
            }
            //Revocamos el Refresh Token actual y
            refreshTokenBd.Revoked = DateTime.UtcNow;
            //generamos un nuevo Refresh Token y lo guardamos en la Base de Datos
            var newRefreshToken = CreateRefreshToken();
            usuario.RefreshTokens.Add(newRefreshToken);
            _unitOfWork.Usuarios.Update(usuario);
            await _unitOfWork.SaveAsync();
            //Generamos un nuevo Json Web Token 😊
            datosUsuarioDto.EstaAutenticado = true;
            JwtSecurityToken jwtSecurityToken = CreateJwtToken(usuario);
            datosUsuarioDto.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            datosUsuarioDto.Email = usuario.Email;
            datosUsuarioDto.UserName = usuario.Username;
            datosUsuarioDto.Roles = usuario.Roles
                                            .Select(u => u.Nombre)
                                            .ToList();
            datosUsuarioDto.RefreshToken = newRefreshToken.Token;
            datosUsuarioDto.RefreshTokenExpiration = newRefreshToken.Expires;
            return datosUsuarioDto;
        }
        private RefreshToken CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(randomNumber);
                return new RefreshToken
                {
                    Token = Convert.ToBase64String(randomNumber),
                    Expires = DateTime.UtcNow.AddDays(10),
                    Created = DateTime.UtcNow
                };
            }
        }
        private JwtSecurityToken CreateJwtToken(Usuario usuario)
        {
            var roles = usuario.Roles;
            var roleClaims = new List<Claim>();
            foreach (var role in roles)
            {
                roleClaims.Add(new Claim("roles", role.Nombre));
            }
            var claims = new[]
            {                   new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
                                new Claim(JwtRegisteredClaimNames.Sub, usuario.Username),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                                new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
                                new Claim("uid", usuario.Id.ToString()),
                                new Claim("UserId", usuario.Id.ToString())
                        }
            .Union(roleClaims);
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }

        public async Task<ICollection<UsuarioDto>> GetUsuariosActive()
        {
            List<UsuarioDto> listUsuarioDto = new List<UsuarioDto>();
            var usuarios = await _unitOfWork.Usuarios.GetUsuariosActive();

            foreach (var item in usuarios)
            {
                UsuarioDto usuarioDto = new UsuarioDto();
                usuarioDto.Id = item.Id;
                usuarioDto.NombreFull = string.Format("{0} {1} {2}", item.Nombre, item.ApellidoPaterno, item.ApellidoMaterno);
                usuarioDto.Nombre = item.Nombre;
                usuarioDto.ApellidoPaterno = item.ApellidoPaterno;
                usuarioDto.ApellidoMaterno = item.ApellidoMaterno;
                usuarioDto.Username = item.Username;
                usuarioDto.Email = item.Email;
                usuarioDto.Roles = String.Join(",", item.Roles
                                   .Select(u => u.Nombre)
                                   .ToList());

                listUsuarioDto.Add(usuarioDto);


            }


            return listUsuarioDto;
        }
    }
}
