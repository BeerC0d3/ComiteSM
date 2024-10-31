export interface IPersona {
  seccionId: number;
  seccion: string;
  personaId: number;
  nombre: string;
  calle: string;
  colonia: string;
  numero: number;
  latitud: string;
  longitud: string;
}
export interface IPersonaProperty {
  id: number;
  seccionId: any;
  nombre: string;
  colonia: string;
  calle: string;
  numero: string;
  latitud: string;
  longitud: string;
}
export interface IPersonaCooperacion {
  seccionId: number;
  seccion: string;
  personaId: number;
  nombre: string;
  periodoId: number;
  periodo: string;
  monto: string;
}
export interface IPersonaCooperacionProperty {
  personaId: number;
  periodoId: number;
  monto: string;
}
export interface ITotalCooperacion {
  total: string;
  periodo: string;
}
