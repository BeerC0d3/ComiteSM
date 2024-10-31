<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Usuarios</template>
    </page-header>
    <q-scroll-area class="page-body absolute-top fit">
      <page-body-header>
        <p class="text-grey-12">Lista usuarios</p>
        <q-toolbar>
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
            placeholder="Busca usuario">
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
            <comp-user :getUserCheck="getCheck" title="Usuarios" :show-check="false" :showOptions="true" />
          </q-card-section>
        </q-card>
      </page-body-custom>
    </q-scroll-area>
    <userForm />
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import CompUser from '../../components/Seguridad/Users.vue';
import userForm from '../../components/Seguridad/AddEditUser.vue'
import { useModalStore } from 'stores/all';

const text = ref('');
const $modalStore = useModalStore();
const clickModalForm = () => {
  $modalStore.ShowModal(0);
}
const getCheck = () => {
  console.log('getCheck')
}
</script>
