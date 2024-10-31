<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-auth">
        <router-view v-slot="{ Component }">
          <transition appear enter-active-class="animated bounceInLeft">
            <component :is="Component" />
          </transition>
        </router-view>
      </q-page>
    </q-page-container>
  </q-layout>
  <q-dialog v-model="dialogInstall" persistent>
    <q-card class="dialog-install">
      <q-toolbar>
        <q-avatar>
          <img src="~assets/SanM.png" alt="">
        </q-avatar>
        <q-toolbar-title><span class="text-weight-bold">Aplicación comité san martín</span></q-toolbar-title>
      </q-toolbar>
      <!-- <q-card-section>
        <div class="text-h6 text'center">Software comité san martín</div>
      </q-card-section> -->

      <q-card-section class="q-pt-none">
        <p class="text-body2 text-grey-12">Aplicación que nos ayudará a controlar los ingresos, compras y ventas</p>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn rounded class="full-width" color="red" label="Instalar aplicación" @click="clickInstall"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { onMounted, onBeforeMount, ref } from 'vue';
// import * as checkApp from '../../support/utils/InstallApp';

let deferredPrompt = ref<any>(null);
const dialogInstall = ref(false);

// window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
//   console.log(e)
//   deferredPrompt.value = e;
// });


onBeforeMount(() => {
  console.log('onBeforeMount layout')

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
    dialogInstall.value = true;
  });
});
const browserType = () => {
  const userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }

  return browserName;
};

const installApp = () => {
  console.log(deferredPrompt);
  deferredPrompt.value.prompt();
  const { outcome } = deferredPrompt.value.userChoice;

  if (outcome === 'dismissed') {
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt.value = null;
    return '';
  }
};

const pwaIsInstalled = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('This IS running as standalone.');
    return true;
  }

  console.log('This is NOT running as standalone.');
  return false;
};

// if (!pwaIsInstalled() && browserType() === 'chrome') {
//   console.log('entre a verificar si esta instalada')
//   dialogInstall.value = true;

// }

const clickInstall = async () => {

  // checkApp.installApp(deferredPrompt);
  await installApp();
  dialogInstall.value = false;
}
</script>
<style scoped>
.dialog-install {
  background-color: #3748a6;
  color: #fff;
  border-radius: 20px;
}
</style>
