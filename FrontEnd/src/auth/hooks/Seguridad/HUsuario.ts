import { ref } from 'vue';
import { Usuario } from '../../../app/services/Seguridad/SUsuario';
import {
  IUsuario,
  IRol,
  IUsuarioProperty,
} from '../../../app/Models/Seguridad/IModel';

const usuarioService = new Usuario();
const usuarios = ref<IUsuario[] | undefined>();
const roles = ref<IRol[] | undefined>();

const GetUsuariosActivos = async () => {
  const tmpUsuarios = await usuarioService.GetUsuariosActivos();

  usuarios.value = tmpUsuarios;

  return tmpUsuarios;
};
const GetRoles = async () => {
  const tmpRoles = await usuarioService.GetRoles();

  roles.value = tmpRoles;

  return tmpRoles;
};
const AddUpdate = async (userModel: IUsuarioProperty) => {
  await usuarioService.AddUpdateService(userModel);
};
export default () => ({
  GetUsuariosActivos,
  usuarios,
  GetRoles,
  roles,
  AddUpdate,
});
