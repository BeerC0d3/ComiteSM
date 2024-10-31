<template>
  <q-page>
    <page-header>
      <template #title>Mi gente</template>
    </page-header>

    <q-scroll-area class="page-body absolute-top fit">

      <page-body-header>
        <!-- <p class="text-grey-12">Lista de periodos</p> -->
        <q-toolbar>
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
            placeholder="Busca persona" @change="searchPersona">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn round icon="add" color="red" size="1em" @click="clickModalForm" />
          <!-- <q-btn flat round icon="fa-solid fa-filter" color="red" size="1em" @click="getHeight" /> -->
          <!-- <p style="color:white">{{ minHeight }}</p> -->
        </q-toolbar>

      </page-body-header>
      <!-- <q-scroll-area class="page-body absolute-top fit"> -->
      <page-body-custom>

        <q-card flat class="card-background ">
          <empty-data icon="fa-solid fa-users" label="No hay ninguna persona." v-if="personas?.length == 0" />
          <useCompPersona v-for="persona in personas" :persona="persona" :key="persona.personaId" :showAmount="false"
            :delete="fnDelete" :edit="fnEdit" :modalMonto="clickModalForm" />
        </q-card>
      </page-body-custom>

    </q-scroll-area>

    <page-footer />
    <usePersonaFormModal />
    <modal-message :modal="GetModal().value" @close="Hide()" />
  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, computed, inject } from 'vue'
import { useQuasar } from 'quasar'
import useCompPersona from '../../components/MiGente/CompPersona.vue'
import usePersonaFormModal from '../../components/MiGente/CompPersonaAddEdit.vue'
import { IPersona } from '../../Models/MiGente/IModel'
import { useModalStore, useCommonStore } from 'stores/all';
import useHookPersona from '../../hooks/MiGente/HPersona'
import useModalMessage from '../../../support/handles/handleModal'

const text = ref('')
const $q = useQuasar();
const $modalStore = useModalStore();

const $commonStore = useCommonStore();
const bus = inject<any>('bus');
const { getPersonaBySeccionUser, personas } = useHookPersona();
const { Show, Hide, GetModal } = useModalMessage();

// const revokePermission = () => {
//   navigator.permissions.revoke({ name: 'geolocation' }).then((result) => {
//     // report(result.state);
//     Show(SUCCESS, 'Mesanje', result)
//   });
// }

// const minHeight = computed(() => $q.screen.height - 230);

// const getHeight = () => {
//   alert($q.screen.height)
// }

const searchPersona = () => {
  console.log('buscando ' + text.value);
}
const clickModalForm = () => {
  $modalStore.ShowModal(0);
}
const fnDelete = async (Id: number) => {
  try {
    //$commonStore.Add_Request();
    //await Delete(Id);
    // await LoadSeccion();
    Show('SUCCESS', 'Exito!', 'La persona se eliminó correctamente');
  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);

  }
}

const fnEdit = (Id: number) => {
  $modalStore.ShowModal(Id);
}
onBeforeMount(async () => {
  await LoadPersona();
});

const LoadPersona = async () => {

  try {

    $commonStore.Add_Request();
    await getPersonaBySeccionUser(0);
  } catch (e: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error!', e);

  }
}
bus.on('load-persona', async () => {
  await LoadPersona();
});

// const listPersona = ref<IPersona[]>([
//   {
//     id: 1,
//     nombre: 'Diego Luna Olea',
//     seccion: 'Iztapalapa',
//     totalCooperacion: '$3500.00'
//   },
//   {
//     id: 2,
//     nombre: 'Fredy Salas Luna',
//     seccion: 'Iztapalapa',
//     totalCooperacion: '$500.00'
//   }

// ])

</script>
