import { defineComponent, onBeforeMount, ref } from 'vue';
import useHookCatalogo from '../../hooks/Sistema/HCatalogo';
import useHookPeriodo from '../../hooks/Periodos/Index';
import { ICatalogoProperty } from '../../Models/Sistema/IModel';
import { IPeriodoProperty } from '../../Models/Periodos/IModel';
import CompUser from '../../components/Seguridad/Users.vue';
import { useCommonStore } from 'stores/all';
import { HandlSuccess } from '../../../support/handles/handleSuccess';
import { HandlError } from 'src/support/handles/handleError';

export default defineComponent({
  name: 'periodoAccess',
  components: {
    CompUser,
  },

  setup: () => {
    /**
     * Variables del componente *
     */

    const catEstatus = ref<ICatalogoProperty[]>([]);
    //const text = ref('');
    // const montoIngreso = ref<any>(0);
    // const number = ref<string | number>(0);
    const type = ref<any>('text');
    const formPeriodo = ref<any>(null);
    const compIntegrantes = ref<any>(null);

    const periodoObject = ref<IPeriodoProperty>({
      Id: 0,
      Nombre: '',
      EstatusId: 0,
      Monto: '0',
      IntegrantesId: '',
    });

    const $commonStore = useCommonStore();

    /**
     * Fin Variables del componente *
     */
    /**
     * Metodos Vue *
     */
    onBeforeMount(async () => {
      await getByCatalogo('CAT_ESTATUS');
      catEstatus.value = catalogosSelect.value;
      // await GetUsuariosActivos();
    });
    /**
     * Fin Metodos Vue *
     */

    /**
     *  Hooks *
     */
    const { getByCatalogo, catalogosSelect } = useHookCatalogo();
    const { AddUpdate } = useHookPeriodo();

    /**
     * Fin Hooks *
     */

    /**
     * funciones componente *
     */

    const onValidation = async (evt: any) => {
      //console.log('form');
      formPeriodo.value.validate().then(async (success: any) => {
        if (success) {
          //console.log(periodoObject.value);
          try {
            //$commonStore.Add_Request();
            periodoObject.value.Monto = periodoObject.value.Monto.replace(
              '$',
              ''
            ).replace(',', '');
            //console.log(periodoObject.value);
            await AddUpdate(periodoObject.value);
            formPeriodo.value.reset();
            formPeriodo.value.resetValidation();
            HandlSuccess('Guardado exitosamente');
          } catch (e) {
            $commonStore.Remove_Request();
            HandlError(e);
          }
        }
      });
    };

    const getCheck = (userIds: any) => {
      // console.log(userIds.join());
      periodoObject.value.IntegrantesId = userIds.join();
    };

    const reset = () => {
      periodoObject.value.Id = 0;
      periodoObject.value.Nombre = '';
      periodoObject.value.EstatusId = 0;
      periodoObject.value.Monto = '0';
      periodoObject.value.IntegrantesId = '';
    };
    /**
     * Fin funciones componente *
     */

    /**
     * Funciones para formatear la cantidad a numero *
     */
    const toNumberStr = (monto: number): string => {
      return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
      }).format(monto);
    };

    periodoObject.value.Monto = toNumberStr(
      parseInt(periodoObject.value.Monto)
    );

    const onFocus = (evt: any) => {
      evt.target.value = evt.target.value.replace('$', '');
      //console.log(parseInt(evt.target.value));
      if (parseInt(evt.target.value) == 0) evt.target.value = '';

      type.value = 'number';
      periodoObject.value.Monto = evt.target.value;
    };
    const onBlur = (evt: any) => {
      type.value = 'text';
      periodoObject.value.Monto = toNumberStr(evt.target.value);
    };

    /**
     * Fin Funciones para formatear la cantidad a numero *
     */

    return {
      catEstatus,
      type,
      formPeriodo,
      periodoObject,
      onValidation,
      onFocus,
      onBlur,
      getCheck,
      reset,
    };
  },
});
