export interface IUsuario {
  id: number;
  nombreFull: string;
  roles: string;
}

export interface IRol {
  nombre: string;
}

export interface IUsuarioProperty {
  id: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  username: string;
  password: string;
  roles: string;
}
