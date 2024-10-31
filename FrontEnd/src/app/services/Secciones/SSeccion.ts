import { api } from 'boot/axios';
import {
  ISeccion,
  ISeccionProperty,
  ISeccionSwiper,
} from '../../Models/Secciones/IModel';

export class Seccion {
  constructor() {
    console.log('accesando Seccion');
  }
  async Get(Id: number): Promise<ISeccion> {
    const { data } = await api.get(`/api/secciones/${Id}`);

    return data;
  }

  async GetAll(): Promise<ISeccion[]> {
    const { data } = await api.get('/api/Secciones/GetSecciones');

    return data;
  }
  async GetByuser(): Promise<ISeccionProperty[]> {
    const { data } = await api.get('/api/Secciones/GetSecciones');

    return data;
  }
  async GetSeccionByuser(): Promise<ISeccionSwiper[]> {
    const { data } = await api.get('/api/Secciones/GetSecciones');

    return data;
  }
  async AddUpdateService(seccionModel: ISeccionProperty) {
    await api
      .post('/api/secciones/AddUpdatePeriodo/', seccionModel)
      .then(async (response) => {
        console.log(response);
      });
  }
  async Delete(Id: number) {
    await api.delete(`/api/secciones/${Id}`).then(async (response) => {
      console.log('seccion eliminada');
    });
  }
}
