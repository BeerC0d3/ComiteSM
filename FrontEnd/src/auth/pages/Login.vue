<template>
  <q-page>
    <div class="page-content">
      <div class="logo-wrapper">
        <div class="container-template inner-wrapper">
          <div class="text-center">
            <img src="~assets/SanM.png" alt="">

          </div>

        </div>
      </div>

      <div class="container-template">
        <div class="card-box">
          <div class="section-area padding-area">
            <h2 class="title text-grey text-center">Ingresar al sistema</h2>

            <q-form class="q-gutter-md" @submit="doLogin">
              <q-input outlined clearable v-model="user.username" label="Email" type="email"
                :rules="[ruleLogin.required]">
                <template v-slot:prepend>
                  <q-icon name="email" color="primary" />
                </template>
              </q-input>

              <q-input outlined clearable v-model="user.password" label="Password" type="password"
                :rules="[ruleLogin.required]">
                <template v-slot:prepend>
                  <q-icon name="lock" color="primary" />
                </template>
              </q-input>

              <q-card-actions>
                <div class="row full-width items-center">
                  <div class="col-12">
                    <q-btn rounded size="md" class="full-width" color="primary" label="Accesar" type="submit"></q-btn>
                  </div>
                </div>
              </q-card-actions>
              <q-card-section>
                <p class="text-caption text-weight-light text-grey box-buttons"></p>
              </q-card-section>
            </q-form>
            <div class="mb-auto"></div>
          </div>
        </div>
      </div>


    </div>

  </q-page>
</template>


<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCommonStore, useUserStore } from 'src/stores/all';
import ruleLogin from 'src/auth/rules/Login';
import { Login } from 'src/auth/types/userModel';
import { useMeta, AddressbarColor, useQuasar } from 'quasar';
import { HandlError } from 'src/support/handles/handleError';
// import { usePushNotificationStore } from '../stores/store-push-notification';
// if (pwaIsInstalled.value) {
//   const addressColor = document.querySelector("meta[name='theme-color']") as HTMLElement;
//   addressColor.setAttribute('content', '#C10015');
// }
const $commonStore = useCommonStore();
// const xx = usePushNotificationStore();

const $authStore = useUserStore();

// const $pushStore = usePushNotificationStore();

const $router = useRouter();
const $route = useRoute();
const $q = useQuasar();
AddressbarColor.set('#a2e3fa')
//$q.addressbarColor.set('#fff');
//$q.addressbarColor.set('#C10015');
const deferredPrompt = ref<any>(null);

const user = reactive<Login>({
  username: '',
  password: '',
});

onMounted(async () => {
  $q.addressbarColor.set('#C10015');

  // $pushStore.SetStatePush()
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt.value = e;
  });
});

const loading = computed(() => $commonStore.isLoading);

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

const doLogin = async () => {
  try {
    $commonStore.Add_Request();
    await $authStore.Login(user);
    $router.push('/app');
    //await $pushStore.ChekSubscriptionPush();
  } catch (error: any) {
    // $commonStore.Remove_Request();
    HandlError(error);
  }
};

const installApp = async () => {
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;

  if (outcome === 'dismissed') {
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt.value = null;
    return '';
  }
};

const pwaIsInstalled = computed(() => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('This IS running as standalone.');
    return true;
  }

  console.log('This is NOT running as standalone.');
  return false;
});

//console.log($q.platform);
</script>
<style scoped>
body {
  background: #fff !important;

}

h1,
.h1 {
  font-size: 1.75rem;
}

.box-buttons {
  text-align: center;
  margin: 25px auto;
  height: 100%;
}

.pagehead-bg {
  min-height: 270px;
  position: absolute;
  background: #3748a6;
  width: 100%;
  background-position: center;
  background-size: cover;
}

.container.has-pagehead {
  min-height: 150px;
}

.container.over {
  background-color: #ffffff;
  z-index: 1;
  position: relative;
  /* border-radius: var(--border-radius); */
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 0 24px;
  margin-bottom: 30px;
  width: 100%;
  box-shadow: 0 -5px 6px -2px rgb(0 0 0 / 10%);
  -webkit-box-shadow: 0 -5px 6px -2px rgb(0 0 0 / 10%);
}
</style>
