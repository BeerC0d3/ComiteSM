import {
  IResumenVentaBoleto,
  IVentaBoleto,
} from 'src/app/Models/Ventas/BoletoBus/IModel';
import { VentaBoletoAutobus } from 'src/app/services/Ventas/BoletoAutobus/SBoletoAutobus';
import { ref } from 'vue';

const ventaBoletoBus = new VentaBoletoAutobus();
const ventaBoletoPersonas = ref<IVentaBoleto[] | undefined>();
const resultResumenVentaBoleto = ref<IResumenVentaBoleto>();

const getAllBoletoPersonaByUsuario = async (
  estatusId: number,
  nombrePersona: string
) => {
  const tmpData = await ventaBoletoBus.GetAllBoletoPersonaByUsuario(
    estatusId,
    nombrePersona
  );
  ventaBoletoPersonas.value = tmpData;
  return tmpData;
};
const getResumenVentaBoletoByUsuario = async () => {
  const tmpData = await ventaBoletoBus.GetResumenVentaBoletoAutobusByUsuario();
  resultResumenVentaBoleto.value = tmpData;
  return tmpData;
};

export default () => ({
  getAllBoletoPersonaByUsuario,
  ventaBoletoPersonas,
  getResumenVentaBoletoByUsuario,
  resultResumenVentaBoleto,
});
