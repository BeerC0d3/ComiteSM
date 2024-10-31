import { api } from 'boot/axios';
import {
  IResumenVentaBoleto,
  IVentaBoleto,
} from 'src/app/Models/Ventas/BoletoBus/IModel';

export class VentaBoletoAutobus {
  constructor() {
    console.log('service VentaBoletoAutobus');
  }

  async GetAllBoletoPersonaByUsuario(
    EstatusId: number,
    NombrePersona: string
  ): Promise<IVentaBoleto[]> {
    const { data } = await api.get(
      '/api/VentaBoletoBus/GetAllBoletoPersonaByUsuario',
      {
        params: { estatusId: EstatusId, nombrePersona: NombrePersona },
      }
    );

    return data;
  }

  async GetResumenVentaBoletoAutobusByUsuario(): Promise<IResumenVentaBoleto> {
    const { data } = await api.get(
      '/api/VentaBoletoBus/GetResumenVentaBoletoAutobusByUsuario'
    );

    return data;
  }
}
