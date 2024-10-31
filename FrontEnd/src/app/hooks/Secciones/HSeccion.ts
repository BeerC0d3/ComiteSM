import { ref } from 'vue';
import { Seccion } from 'src/app/services/Secciones/SSeccion';
import {
  ISeccion,
  ISeccionProperty,
  ISeccionSwiper,
} from 'src/app/Models/Secciones/IModel';

const seccionService = new Seccion();
const secciones = ref<ISeccion[] | undefined>();
const seccionesByUser = ref<ISeccionProperty[] | undefined>();
const seccionesByUserSwipe = ref<ISeccionSwiper[] | undefined>();
const seccionResult = ref<ISeccion>();

const get = async (Id: number) => {
  const tmpseccion = await seccionService.Get(Id);
  seccionResult.value = tmpseccion;
  return tmpseccion;
};
const getAll = async () => {
  const tmpsecciones = await seccionService.GetAll();

  secciones.value = tmpsecciones;

  return tmpsecciones;
};

const getByUser = async () => {
  const tmpsecciones = await seccionService.GetByuser();

  seccionesByUser.value = tmpsecciones;

  return tmpsecciones;
};
const GetSeccionByuser = async () => {
  const tmpsecciones = await seccionService.GetSeccionByuser();

  seccionesByUserSwipe.value = tmpsecciones;

  return tmpsecciones;
};

const AddUpdate = async (seccionModel: ISeccionProperty) => {
  await seccionService.AddUpdateService(seccionModel);
};
const Delete = async (Id: number) => {
  await seccionService.Delete(Id);
};

export default () => ({
  get,
  getAll,
  secciones,
  AddUpdate,
  Delete,
  seccionResult,
  getByUser,
  seccionesByUser,
  GetSeccionByuser,
  seccionesByUserSwipe,
});
