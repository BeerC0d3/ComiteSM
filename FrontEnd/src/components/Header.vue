<template>
  <header id="header-master"
    class="page-header app-header q-header q-layout__section--marginal fixed-top q-header--bordered absolute-top bg-header">
    <div class="container-template">
      <q-toolbar>
        <div class="q-toolbar row no-wrap items-center">
          <slot name="buttons-left" />

          <div class="page-header-title q-toolbar__title ellipsis text-body1 q-pl-none">
            <slot name="title" />
          </div>
        </div>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn dense flat round icon="fa-solid fa-right-from-bracket" @click="Salir" />

          <!-- <q-btn v-if="$q.screen.gt.xs" dense flat round icon="apps">
            <q-tooltip>Cambiar sucursal</q-tooltip>
          </q-btn> -->

          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        </div>
      </q-toolbar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDrawerStore, useUserStore } from 'src/stores/all';
import * as useHeader from 'src/support/utils/useHeaderAmount'
import { useRoute } from 'vue-router';

const $store = useUserStore();
const $router = useRouter();
const $drawerStore = useDrawerStore();
const bus = inject<any>('bus');
const toggle = ref(false);
const $route = useRoute();

onMounted(() => {
  //useHeader.setHeaderAmount();

  const div = document.getElementById('header-master') as HTMLElement;
  if ($route.name == 'Cooperacion'
    || $route.name == 'MiCooperacion'
    || $route.name == 'VentaBoletosBus'
  ) {
    console.log('entre a cooperacion')
    if (div.classList.contains('app-header')) {
      div.classList.add('app-header');
    }
  } else {
    if (div.classList.contains('app-header'))
      div.classList.remove('app-header');
  }
})

const toggleLeftDrawer = () => {
  toggle.value = true;
  $drawerStore.StateToggle(toggle.value);
  // bus.emit('drawerOpen', toggle.value);
};
// const isAuthenticated = $store.isAuthenticated;

const Salir = (): void => {
  $store.logout();
  $router.push('/auth/login');
};
</script>
<style lang="scss" scoped>
.app-header {
  padding: 16px 0px 84px;
  /* margin: 0px -16px; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  /* position: relative; */
  border-bottom-right-radius: 80px;
  border-bottom-left-radius: 80px;
}
</style>
