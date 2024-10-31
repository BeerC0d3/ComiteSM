<template>
  <q-page padding class="modal-cooperacion">
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Venta boletos autobus </template>
    </page-header>
    <header-amount>
      <template #title-left>{{ resultResumenVentaBoleto?.nombrePeriodo }}</template>
      <template #amount-left>Monto adeudo : <span class="resultTotal"> {{ resultResumenVentaBoleto?.montoAdeudo
      }}</span></template>
      <template #amount-remaining-left>Monto total: <span class="resultTotal">{{ resultResumenVentaBoleto?.costoTotal }}
        </span></template>
      <template #button-right>
        <q-btn color="primary" icon="fa-solid fa-circle-plus" flat size="20px" to="/app/ventas/boletoAutobus/AddEdit" />
      </template>
      <template #footer>
        <div class="q-pa-xs text-center">
          <!-- <q-btn-group id="btn-group-estatus" class="q-btn-group--rounded">

            <q-btn v-for="btnEstatus in listEstatus" :key="btnEstatus.id" :label="btnEstatus.label"
              @click="clickEstatus(btnEstatus.id)" class="btn-group-color ellipsis"
              :color="btnEstatus.isSelected ? 'primary' : 'text-primary'" :id="`btn-${btnEstatus.id}`"
              :data-estatusid="btnEstatus.id" style="text-transform: capitalize;"
              :icon="btnEstatus.isSelected ? 'check' : 'fa-solid fa-ban'" size="0.9em" />

          </q-btn-group> -->
          <compUseSwiper :data="listEstatus" :getChecks="getChecks" />
        </div>
        <q-input rounded clearable outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="txtNombre"
          placeholder="Busca persona">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

      </template>
    </header-amount>
    <page-body>
      <div style="height: 195px !important;"></div>
      <div class="q-pa-xs">
        <compUseBoletoPersona v-for="boleto in ventaBoletoPersonas" :persona="boleto" :key="boleto.ventaBoletoId" />
      </div>
    </page-body>

  </q-page>
</template>
<script setup lang="ts">
import { onBeforeMount, computed, reactive, ref, watch } from 'vue';
import { IVentaBoleto } from '../../../Models/Ventas/BoletoBus/IModel'
import compUseBoletoPersona from '../../../components/Ventas/BoletoAutoBus/BoletoPersona.vue'
import compUseSwiper from 'src/app/components/Sistema/SwiperSlide.vue'
import { ISwiper } from 'src/app/Models/Sistema/IModel';
import useHookCatalogo from 'src/app/hooks/Sistema/HCatalogo';
import useModalMessage from '../../../../support/handles/handleModal'
import useHookVentaBoleto from '../../../hooks/Ventas/BoletoAutobus/HVentaBoletoAutobus'


const txtNombre = ref('');
const estatusId = ref(0);
/*hooks*/
const { getByCatalogo, catalogosSelect } = useHookCatalogo();
const { getAllBoletoPersonaByUsuario, ventaBoletoPersonas, getResumenVentaBoletoByUsuario, resultResumenVentaBoleto } = useHookVentaBoleto();
const { Show, Hide, GetModal } = useModalMessage();


const listEstatus = reactive<ISwiper[]>([]);

onBeforeMount(async () => {
  await getResumenVentaBoletoByUsuario();
  await getByCatalogo('ESTATUS_VENTA_BOLAUTOBUS');
  catalogosSelect.value.forEach((item) => {
    listEstatus.push({
      id: item.id,
      nombre: item.descripcion,
      selected: false,
    })
  })
});


const LoadBoletoPersona = async () => {

  try {
    await getAllBoletoPersonaByUsuario(estatusId.value, txtNombre.value);
  } catch (e: any) {
    //$commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);
    // console.log(e);
  }
}
const search = computed({
  get() {
    return txtNombre.value;
  },
  set(newValue) {
    [txtNombre.value] = newValue;
  }
});

watch(
  () => search.value,
  (newVal) => {
    if (newVal) {
      //console.log('valor=>' + newVal)
      LoadBoletoPersona();

    } else {
      if (search.value == '' || search.value == null)
        LoadBoletoPersona();

    }
  }
);

const getChecks = async (Id: number) => {
  estatusId.value = parseInt(Id.toString());
  await LoadBoletoPersona();
  //console.log('valor=>' + Id)

}


// const clickEstatus = (estatusId: number) => {

//   unSelected();
//   Selected(estatusId);

// }

// const unSelected = () => {
//   listEstatus.value.forEach((item => {
//     item.isSelected = false
//   }))
// }
// const Selected = (estatusId: number) => {
//   listEstatus.value.forEach((item => {
//     item.isSelected = item.id == estatusId ? true : false;
//   }))
// }


</script>
<style lang="scss" scoped>
.q-btn-group--rounded {
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.24);
}

.btn-group-color {
  background: #DFE2EC;
  color: #3748a6 !important;
}

.bg-primary {
  color: #fff !important;
}
</style>
