<template>
  <q-page padding id="modal-cooperacion">
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Mi cooperación </template>
    </page-header>
    <header-amount>
      <template #title-left>{{ totalCooperacionModel?.periodo }}</template>
      <template #amount-left>${{ totalCooperacionModel?.total }}</template>
      <template #button-right>
        <q-btn color="primary" icon="fa-solid fa-file-pdf" flat size="20px" @click="exportReportPdf" />
      </template>
      <template #footer>
        <useSeccionSwiper :getChecks="getChecks" />
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
      <div class="q-pa-md">

        <!-- <useCompListCooperacionUsers /> -->
        <useCompPersona v-for="persona in listPersonaCooperacion" :persona="persona" :key="persona.personaId"
          :showAmount="true" :delete="fnDelete" :edit="fnEdit" :modalMonto="clickModalForm" />
        <!-- <q-card class="my-card" style="border-radius: 15px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);">
          <q-card-section>
          </q-card-section>
        </q-card> -->
      </div>
    </page-body>
    <modal-message :modal="GetModal().value" @close="Hide()" />
    <useMontoPersonaModal />

  </q-page>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, watch, inject } from 'vue'
import useSeccionSwiper from 'src/app/components/Secciones/SeccionSwiper.vue'
// import useCompListCooperacionUsers from '../../components/Ingresos/CompListCooperacionPersona.vue'
import useHookPersona from '../../hooks/MiGente/HPersona'
import useHooReportePdf from '../../hooks/Reportes/HReportePdf'
import { useModalStore, useCommonStore } from 'stores/all';
import useCompPersona from '../../components/MiGente/CompPersona.vue'
import useModalMessage from '../../../support/handles/handleModal'
import useMontoPersonaModal from '../../components/MiGente/CooperacionPersona.vue'
import { ITotalCooperacion } from 'src/app/Models/MiGente/IModel';


const seccionId = ref(0);

const txtNombre = ref('')
const totalCooperacionModel = ref<ITotalCooperacion | undefined>()

const { getPersonaCooperacion, listPersonaCooperacion, totalCooperacion, getTotalCooperacionByUser } = useHookPersona();
const { ReporteCooperacionIntegrante } = useHooReportePdf();
const $commonStore = useCommonStore();
const { Show, Hide, GetModal } = useModalMessage();
const $modalStore = useModalStore();
const bus = inject<any>('bus');

const clickModalForm = (personaId: number) => {
  console.log(personaId)
  $modalStore.ShowModal(personaId);
}
onBeforeMount(async () => {
  await LoadTotal();
  //console.log('onBeforeMount listado')
});
const getChecks = async (Id: number) => {
  seccionId.value = parseInt(Id.toString());
  await LoadPersona();
  //console.log('seccionId=>' + Id)

}
const search = computed({
  get() {
    return txtNombre.value;
  },
  set(newValue) {
    [txtNombre.value] = newValue;
  }
})

watch(
  () => search.value,
  (newVal) => {
    if (newVal) {
      //console.log('valor=>' + newVal)
      LoadPersona();

    } else {
      if (search.value == '' || search.value == null)
        LoadPersona();

    }
  }
);
const btnSearch = () => {
  console.log('search');
}
const fnDelete = async (Id: number) => {
  console.log('fnDelete')
}
const fnEdit = async (Id: number) => {
  console.log('fnEdit')
}

const LoadPersona = async () => {

  try {

    //$commonStore.Add_Request();
    $commonStore.Add_Request();
    await getPersonaCooperacion(seccionId.value, txtNombre.value);



  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);
    // console.log(e);
  }
}
const LoadTotal = async () => {

  try {
    await getTotalCooperacionByUser();
    totalCooperacionModel.value = totalCooperacion.value;

  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);
    // console.log(e);
  }
}
bus.on('load-cooperacion', async () => {
  await LoadPersona();
  await LoadTotal();
});

const exportReportPdf = async () => {
  try {

    $commonStore.Add_Request();
    await ReporteCooperacionIntegrante();

  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);

  }
}


</script>
<style lang="scss" scoped>
.q-dialog {
  @import 'src/assets/app.scss';
}

.card-bg {

  // background: #E4E9F5 !important;
  background: #fff !important;
}

.q-bar {
  background: #fff;
  // background: #4B5EB2;

}

.header-tool {
  position: fixed;
  // background: #4B5EB2 !important;
  background: #fff !important;
}

.tool-bar-fixed {
  position: fixed;
  z-index: 10;
  // max-width: 650px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
}

.content-seccion-fixed {
  // background: #4B5EB2;
  background: #fff;
  color: #fff;
  z-index: 20;
  position: fixed;
  margin: 0 auto;
  top: 50px;
  left: 0;
  right: 0;
  padding: 12px 5px;
}

.content-search-fixed {
  // background: #4B5EB2;
  background: #fff;
  z-index: 30;
  position: fixed;
  margin: 0 auto;
  top: 95px;
  left: 0px;
  right: 0px;
  padding: 12px 5px;
}

.content-list {
  position: relative;
  top: 120px;
}
</style>
