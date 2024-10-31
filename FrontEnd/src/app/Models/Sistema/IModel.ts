export interface ICatalogoModel {
  totalPages: number;
  result: [] | undefined;
}

export interface ICatalogoSelect {
  value: number;
  label: string;
}

export interface ICatalogoProperty {
  id: number;
  clave: string;
  descripcion: string;
  activo: boolean;
}

export interface ICatalogo {
  id: number;
  clave: string;
  descripcion: string;
}
export interface IMenu {
  id: number;
  titulo: string;
  url: string;
  icono: string;
  menuHijos: [];
}

export interface IModaleMessage {
  typeMessageClave: string;
  title: string;
  message: string;
  Show: boolean;
}
export interface ISwiper {
  id: number;
  nombre: string;
  selected: boolean;
}
