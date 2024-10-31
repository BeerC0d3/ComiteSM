import { api } from 'boot/axios';
import {
  ICatalogoModel,
  ICatalogoProperty,
  ICatalogo,
} from '../../Models/Sistema/IModel';

export class CatalogoDetalle {
  constructor() {
    console.log('accesando catalogoDetalle');
  }
  async Get(pageNumber: number): Promise<ICatalogoModel> {
    const { data } = await api.get('/api/CatalogoDetalle', {
      params: { PageNumber: pageNumber },
    });

    return data;
  }

  async GetByCatalogo(claveCatalogo: string): Promise<ICatalogoProperty> {
    const { data } = await api.get(
      `/api/CatalogoDetalle/GetByCatalogo/${claveCatalogo}`
    );

    return data;
  }

  async GetCatalogo(): Promise<ICatalogo> {
    const { data } = await api.get('/api/CatalogoDetalle/GetCatalogo');

    return data;
  }
}
