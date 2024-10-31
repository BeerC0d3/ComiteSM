﻿// <auto-generated />
using System;
using BeerC0d3.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BeerC0d3.Infrastructure.Data.Migrations
{
    [DbContext(typeof(BeerCodeContext))]
    [Migration("20231104020018_Migration-Seeccion_UsuarioPeriodo")]
    partial class MigrationSeeccion_UsuarioPeriodo
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("Sistema")
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.Periodo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<int>("EstatusId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaAlta")
                        .HasColumnType("datetime");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("UsuarioAlta")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("EstatusId");

                    b.ToTable("Periodo", "Comite");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.Seccion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("FechaAlta")
                        .HasColumnType("datetime");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<string>("UsuarioAlta")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Seccion", "Comite");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.UsuarioPeriodo", b =>
                {
                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<int>("PeriodoId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaAlta")
                        .HasColumnType("datetime2");

                    b.HasKey("UsuarioId", "PeriodoId");

                    b.HasIndex("PeriodoId");

                    b.ToTable("UsuarioPeriodo", "Comite");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.UsuarioSeccion", b =>
                {
                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<int>("SeccionId")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaAlta")
                        .HasColumnType("datetime2");

                    b.HasKey("UsuarioId", "SeccionId");

                    b.HasIndex("SeccionId");

                    b.ToTable("UsuarioSeccion", "Comite");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.RefreshToken", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("Expires")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("Revoked")
                        .HasColumnType("datetime2");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UsuarioId");

                    b.ToTable("RefreshToken", "Seguridad");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.Rol", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Rol", "Seguridad");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.Usuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<string>("ApellidoMaterno")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("ApellidoPaterno")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("CodigoActivacion")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("EmailConfirmado")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("FechaActivacion")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("FechaRegistro")
                        .HasColumnType("datetime");

                    b.Property<string>("FotoUrl")
                        .HasMaxLength(600)
                        .HasColumnType("varchar(600)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Usuario", "Seguridad");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.UsuariosRoles", b =>
                {
                    b.Property<int>("UsuarioId")
                        .HasColumnType("int");

                    b.Property<int>("RolId")
                        .HasColumnType("int");

                    b.HasKey("UsuarioId", "RolId");

                    b.HasIndex("RolId");

                    b.ToTable("UsuariosRoles", "Seguridad");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.Catalogo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<string>("Clave")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Catalogo", "Sistema");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.CatalogoDetalle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<int>("CatId")
                        .HasColumnType("int");

                    b.Property<string>("Clave")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime>("FechAlta")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CatId");

                    b.ToTable("CatalogoDetalle", "Sistema");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<bool>("Activo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("FechaAlta")
                        .HasColumnType("datetime2");

                    b.Property<string>("Icono")
                        .HasMaxLength(400)
                        .HasColumnType("nvarchar(400)");

                    b.Property<int>("MenuIdPadre")
                        .HasColumnType("int");

                    b.Property<string>("Roles")
                        .IsRequired()
                        .HasMaxLength(400)
                        .HasColumnType("nvarchar(400)");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Menu", "Sistema");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.Periodo", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Sistema.CatalogoDetalle", "CatalogoDetalle")
                        .WithMany("Periodos")
                        .HasForeignKey("EstatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CatalogoDetalle");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.UsuarioPeriodo", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Comite.Periodo", "Periodo")
                        .WithMany("UsuarioPeriodos")
                        .HasForeignKey("PeriodoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeerC0d3.Core.Entities.Seguridad.Usuario", "Usuario")
                        .WithMany("UsuarioPeriodos")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Periodo");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.UsuarioSeccion", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Comite.Seccion", "Seccion")
                        .WithMany("UsuarioSecciones")
                        .HasForeignKey("SeccionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeerC0d3.Core.Entities.Seguridad.Usuario", "Usuario")
                        .WithMany("UsuarioSecciones")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seccion");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.RefreshToken", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Seguridad.Usuario", "Usuario")
                        .WithMany("RefreshTokens")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.UsuariosRoles", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Seguridad.Rol", "Rol")
                        .WithMany("UsuariosRoles")
                        .HasForeignKey("RolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BeerC0d3.Core.Entities.Seguridad.Usuario", "Usuario")
                        .WithMany("UsuariosRoles")
                        .HasForeignKey("UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Rol");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.CatalogoDetalle", b =>
                {
                    b.HasOne("BeerC0d3.Core.Entities.Sistema.Catalogo", "Catalogo")
                        .WithMany("CatalogoDetalles")
                        .HasForeignKey("CatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Catalogo");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.Periodo", b =>
                {
                    b.Navigation("UsuarioPeriodos");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Comite.Seccion", b =>
                {
                    b.Navigation("UsuarioSecciones");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.Rol", b =>
                {
                    b.Navigation("UsuariosRoles");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Seguridad.Usuario", b =>
                {
                    b.Navigation("RefreshTokens");

                    b.Navigation("UsuarioPeriodos");

                    b.Navigation("UsuarioSecciones");

                    b.Navigation("UsuariosRoles");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.Catalogo", b =>
                {
                    b.Navigation("CatalogoDetalles");
                });

            modelBuilder.Entity("BeerC0d3.Core.Entities.Sistema.CatalogoDetalle", b =>
                {
                    b.Navigation("Periodos");
                });
#pragma warning restore 612, 618
        }
    }
}
