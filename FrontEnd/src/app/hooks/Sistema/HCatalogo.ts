import { ref } from 'vue';
import { CatalogoDetalle } from '../../services/Sistema/SCatalogo';
import {
  ICatalogoModel,
  ICatalogoProperty,
  ICatalogo,
} from '../../Models/Sistema/IModel';

const catalogoService = new CatalogoDetalle();
const catalogos = ref<ICatalogoModel>({ totalPages: 0, result: [] });
const catalogosSelect = ref<ICatalogoProperty[]>([]);
const catalogoSelect = ref<ICatalogo[]>([]);

const getAll = async (pageNumber: number) => {
  const tmpCatalogos = await catalogoService.Get(pageNumber);

  catalogos.value.result = tmpCatalogos.result;
  catalogos.value.totalPages = tmpCatalogos.totalPages;
  return tmpCatalogos;
};

const getByCatalogo = async (claveCatalogo: string) => {
  //console.log('claveCatalogo' + claveCatalogo);
  const tmpCatalogosSelect = await catalogoService.GetByCatalogo(claveCatalogo);
  catalogosSelect.value = [...(tmpCatalogosSelect as ICatalogoProperty | any)];

  return tmpCatalogosSelect;
};

const getCatalogo = async () => {
  const tmpCatalogoSelect = await catalogoService.GetCatalogo();
  catalogoSelect.value = [...(tmpCatalogoSelect as ICatalogo | any)];

  return tmpCatalogoSelect;
};

export default () => ({
  getAll,
  catalogos,
  catalogosSelect,
  catalogoSelect,
  getByCatalogo,
  getCatalogo,
});
