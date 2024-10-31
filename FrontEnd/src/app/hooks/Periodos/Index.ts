import { ref } from 'vue';
import { Periodo } from 'src/app/services/Periodos/Index';
import { IPeriodo, IPeriodoProperty } from 'src/app/Models/Periodos/IModel';

const periodoService = new Periodo();
const periodos = ref<IPeriodo[] | undefined>();

const getAll = async () => {
  const tmpPeriodos = await periodoService.Get();

  periodos.value = tmpPeriodos;

  return tmpPeriodos;
};

const AddUpdate = async (periodoModel: IPeriodoProperty) => {
  await periodoService.AddUpdateService(periodoModel);
};

export default () => ({
  getAll,
  periodos,
  AddUpdate,
});
