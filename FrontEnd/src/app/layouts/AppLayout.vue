<template>
  <!-- <div class="container-template"> -->
  <q-layout view="lHh Lpr lFf">
    <!-- <q-page-container>
        <router-view />
      </q-page-container> -->
    <page-drawer />
    <page-periodo />
    <!-- <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </q-page>
    </q-page-container> -->
    <q-page-container>
      <q-page>
        <router-view v-slot="{ Component }">
          <!-- <transition appear enter-active-class="animated bounceInLeft"> -->
          <component :is="Component" />
          <!-- </transition> -->
        </router-view>
      </q-page>
    </q-page-container>

  </q-layout>
  <!-- </div> -->
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';

// const bus = inject<any>('bus');
// const leftDrawerOpen = ref(false);

// bus.on('drawerOpen', (drawerOpen: boolean) => {
//   leftDrawerOpen.value = drawerOpen;
// });
</script>
