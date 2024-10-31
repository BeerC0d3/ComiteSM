import { api } from 'boot/axios';
import {
  IUsuario,
  IRol,
  IUsuarioProperty,
} from '../../Models/Seguridad/IModel';

export class Usuario {
  constructor() {
    console.log('accesando Usuario');
  }

  async GetUsuariosActivos(): Promise<IUsuario[]> {
    const { data } = await api.get('/api/Usuarios/GetUsuarios');

    return data;
  }

  async GetRoles(): Promise<IRol[]> {
    const { data } = await api.get('/api/Usuarios/GetRoles');

    return data;
  }

  async AddUpdateService(userModel: IUsuarioProperty) {
    await api
      .post('/api/Usuarios/register/', userModel)
      .then(async (response) => {
        console.log(response);
      });
  }
}
