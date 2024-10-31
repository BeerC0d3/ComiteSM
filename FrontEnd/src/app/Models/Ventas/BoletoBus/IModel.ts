export interface IVentaBoleto {
  ventaBoletoId: number;
  nombrePersona: string;
  claveEstatus: string;
  estatus: string;
  totalBoletos: number;
  costoTotal: string;
}

export interface IResumenVentaBoleto {
  periodoId: number;
  nombrePeriodo: string;
  montoAdeudo: string;
  costoTotal: string;
}

export interface IVentaBoletoProperty {
  id: number;
  nombrePersona: string;
  periodoId: number;
  personaId: number;
  estatusId: number;
}
export interface IVentaBoletoDetalle {
  id: number;
  tipoBoleto: string;
  precio: number;
  cantidad: number;
  selected: boolean;
}

export interface IVentaBoletoTotal {
  monto: number;
  adeudo: number;
  total: number;
}
