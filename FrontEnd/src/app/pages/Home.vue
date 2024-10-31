<template>
  <q-page padding>
    <page-header>
      <!-- <template #buttons-left>
        <page-header-btn-back label="Medicos" />
      </template> -->
      <template #title>Inicio</template>
    </page-header>
    <page-body>
      <!-- <h3>Hola mundo</h3> -->
      <div class="container-template">


      </div>
      <div class="q-pa-lg">

        <div class="absolute-center text-center">
          <img src="~assets/SanM.png" alt="">
          <!-- <q-img src="~assets/beer.png" style="max-width: 300px"></q-img> -->
          <p class="text-h4 text-weight-bold text-grey-14">Bienvenido </p>
          <p class="text-h6 text-grey-14">
            {{ $user.nombre }}
          </p>
        </div>
        <!-- <q-btn round icon="add" color="red" size="1em" @click="clickShow" />
        <q-btn rounded color="red" size="1em" @click="clickModalForm" label="modal-bottom" />
        <q-btn rounded color="red" size="1em" @click="clickModalForm" label="modal-form" /> -->

      </div>
      <!-- <div v-if="$q.platform.is.desktop" class="text-h6 text-grey-14">
        I'm only rendered on desktop!
      </div>

      <div v-if="$q.platform.is.mobile" class="text-h6 text-grey-14">
        I'm only rendered on mobile!
      </div>

      <div v-if="$q.platform.is.electron" class="text-h6 text-grey-14">
        I'm only rendered on Electron!
      </div> -->



    </page-body>

    <page-footer />

    <modal-message :modal="GetModal().value" @close="Hide()" />
    <userForm />

  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import * as storage from 'src/auth/storage';
import useModal from '../../support/handles/handleModal'
import userForm from '../components/Seguridad/AddEditUser.vue'
import { useModalStore } from 'stores/all';

const $modalStore = useModalStore();
const dialog = ref(false)
const dialogBottom = ref(false)
const $q = useQuasar()


const $user = storage.getUser();
const { Show, Hide, GetModal } = useModal();
const clickShow = () => {

  Show('SUCCESS', 'Exito!', 'La transacción se realizo correctamente');

}


const clickModalForm = () => {
  $modalStore.ShowModal();
}
const HideForm = () => {
  dialog.value = false;
}
</script>
