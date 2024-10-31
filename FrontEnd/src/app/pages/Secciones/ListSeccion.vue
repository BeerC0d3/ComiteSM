<template>
  <q-page>
    <page-header>
      <template #title>Mis secciones</template>
    </page-header>

    <q-scroll-area class="page-body absolute-top fit">

      <page-body-header>
        <p class="text-grey-12">Lista de periodos</p>
        <!-- <q-separator color="red" /> -->

        <q-toolbar>
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
            placeholder="Busca sección">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn round icon="add" color="red" size="1em" @click="clickModalForm" />
        </q-toolbar>
      </page-body-header>
      <page-body-custom>
        <q-card flat class="card-background">
          <q-card-section>
            <empty-data icon="fa-solid fa-location-dot" label="No hay ninguna sección." v-if="secciones?.length == 0" />
            <useCompSeccion v-for="seccion in secciones" :key="seccion.id" :seccion="seccion" :delete="fnDelete"
              :edit="fnEdit" />
          </q-card-section>
        </q-card>


      </page-body-custom>

    </q-scroll-area>

    <page-footer />
    <useSeccionFormModal />
    <modal-message :modal="GetModal().value" @close="Hide()" />
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject, computed } from 'vue'
import { useQuasar } from 'quasar'
import useSeccionFormModal from '../../components/Secciones/CompSeccionAddEdit.vue'
import useCompSeccion from '../../components/Secciones/CompSeccion.vue'
import useHookSeccion from '../../hooks/Secciones/HSeccion'
import { useModalStore, useCommonStore } from 'stores/all';
import useModalMessage from '../../../support/handles/handleModal'

const text = ref('');
const seccionId = ref(0);
const $modalStore = useModalStore();
const $q = useQuasar()


const { Show, Hide, GetModal } = useModalMessage();
const { getAll, secciones, Delete } = useHookSeccion();


const $commonStore = useCommonStore();
const bus = inject<any>('bus');


const clickModalForm = () => {
  $modalStore.ShowModal(0);
}
const fnDelete = async (Id: number) => {
  try {
    $commonStore.Add_Request();
    await Delete(Id);
    await LoadSeccion();
    Show('SUCCESS', 'Exito!', 'La sección se eliminó correctamente');
  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);

  }
}

const fnEdit = (Id: number) => {
  $modalStore.ShowModal(Id);
}

onBeforeMount(async () => {
  LoadSeccion();
});

const LoadSeccion = async () => {

  try {

    $commonStore.Add_Request();
    await getAll();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
}

bus.on('load-seccion', async () => {
  await LoadSeccion();
});

</script>
<style>
.q-item__section p {
  margin: 0 0 3px
}
</style>
