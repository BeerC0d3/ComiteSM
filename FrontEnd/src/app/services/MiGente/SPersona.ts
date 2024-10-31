import { api } from 'boot/axios';
import {
  IPersonaProperty,
  IPersona,
  IPersonaCooperacion,
  IPersonaCooperacionProperty,
  ITotalCooperacion,
} from '../../Models/MiGente/IModel';

export class Persona {
  constructor() {
    console.log('service Persona');
  }
  async GetPersonaBySeccionUser(seccionId: number): Promise<IPersona[]> {
    const { data } = await api.get(
      `/api/personas/GetPersonasBySeccionUser/${seccionId}`
    );

    return data;
  }
  async GetPersonaCooperacion(
    seccionid: number,
    searchPersona: string
  ): Promise<IPersonaCooperacion[]> {
    const { data } = await api.get('/api/personas/GetPersonasCooperacion', {
      params: { seccionId: seccionid, nombre: searchPersona },
    });

    return data;
  }

  // async GetAll(): Promise<ISeccion[]> {
  //   const { data } = await api.get('/api/Secciones/GetSecciones');

  //   return data;
  // }
  async GetPersona(personaId: number): Promise<IPersonaProperty> {
    const { data } = await api.get(`/api/personas/GetPersona/${personaId}`);

    return data;
  }
  async GetTotalCooperacionByUser(): Promise<ITotalCooperacion> {
    const { data } = await api.get('/api/personas/GetTotalCooperacionByUser');

    return data;
  }
  async AddUpdateService(personaModel: IPersonaProperty) {
    await api
      .post('/api/personas/AddUpdatePersona', personaModel)
      .then(async (response) => {
        return response;
      });
  }
  async CooperacionPersonaService(personaModel: IPersonaCooperacionProperty) {
    await api
      .post('/api/personas/CooperacionPersona', personaModel)
      .then(async (response) => {
        return response;
      });
  }
  async Delete(Id: number) {
    await api.delete(`/api/secciones/${Id}`).then(async (response) => {
      console.log('seccion eliminada');
    });
  }
}
