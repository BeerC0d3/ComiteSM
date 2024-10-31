import { ref } from 'vue';
import {
  IPersonaProperty,
  IPersona,
  IPersonaCooperacion,
  IPersonaCooperacionProperty,
  ITotalCooperacion,
} from 'src/app/Models/MiGente/IModel';
import { Persona } from 'src/app/services/MiGente/SPersona';

const personaService = new Persona();
const personas = ref<IPersona[] | undefined>();
const persona = ref<IPersonaProperty>();
const totalCooperacion = ref<ITotalCooperacion>();
const listPersonaCooperacion = ref<IPersonaCooperacion[] | undefined>();
// const seccionesByUser = ref<ISeccionProperty[] | undefined>();
// const seccionResult = ref<ISeccion>();

const getPersonaBySeccionUser = async (seccionId: number) => {
  const tmppersona = await personaService.GetPersonaBySeccionUser(seccionId);
  personas.value = tmppersona;
  return tmppersona;
};
const getPersonaCooperacion = async (
  seccionId: number,
  searchPersona: string
) => {
  const tmpPersona = await personaService.GetPersonaCooperacion(
    seccionId,
    searchPersona
  );
  listPersonaCooperacion.value = tmpPersona;
  return tmpPersona;
};
const getPersona = async (personaId: number) => {
  const tmpData = await personaService.GetPersona(personaId);
  persona.value = tmpData;
  return tmpData;
};

const getTotalCooperacionByUser = async () => {
  const tmp = await personaService.GetTotalCooperacionByUser();
  totalCooperacion.value = tmp;
  return tmp;
};

const AddUpdate = async (personaModel: IPersonaProperty) => {
  await personaService.AddUpdateService(personaModel).then(async (response) => {
    return response;
  });
};
const AddCooperacionPersona = async (
  personaModel: IPersonaCooperacionProperty
) => {
  await personaService
    .CooperacionPersonaService(personaModel)
    .then(async (response) => {
      return response;
    });
};

export default () => ({
  getPersonaBySeccionUser,
  personas,
  AddUpdate,
  getPersonaCooperacion,
  listPersonaCooperacion,
  AddCooperacionPersona,
  getPersona,
  persona,
  getTotalCooperacionByUser,
  totalCooperacion,
});
