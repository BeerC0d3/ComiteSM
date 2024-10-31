export interface IPeriodo {
  id: number;
  nombre: string;
  claveEstatus: string;
  estatus: string;
  ingresos: string;
  gastos: string;
  integrantes: number;
}

export interface IPeriodoSelected {
  poId: number;
  claveEstatus: string;
}

export interface IPeriodoProperty {
  Id: number;
  Nombre: string;
  EstatusId: number;
  Monto: string;
  IntegrantesId: string;
}
