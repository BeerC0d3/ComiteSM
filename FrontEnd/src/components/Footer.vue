<template>
  <q-footer bordered class="bg-footer footer-radius-10">
    <q-tabs active-color="text-white" class="text-grey" no-caps>
      <q-route-tab v-for="navItem in store.stateNav.navItems" :key="navItem.root" :to="navItem.to" :label="navItem.label"
        :icon="navItem.icon" />
      <!-- <q-route-tab v-for="navItem in store.stateNav.navItems" :key="navItem.root" :to="navItem.to" :label="navItem.label"
        :icon="navItem.icon" @click="(event) => navItem.name == 'Logout' ? Salir('logout app', event) : ''" /> -->

    </q-tabs>
  </q-footer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/all';
import store from '../support/utils/updateNavItem'

// const $store = useUserStore();
// const $router = useRouter();

// const Salir = (message: string, event: any): void => {
//   console.log(message)
//   $store.logout();
//   $router.push('/auth/login');
// };
</script>
