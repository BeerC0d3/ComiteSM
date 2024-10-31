<template>
  <q-drawer class="bg-red-9" v-model="leftDrawerOpen" side="left" overlay bordered behavior="mobile"
    @hide="(value) => ShowHidden(value)">
    <q-scroll-area class="scroll-content">
      <q-list>
        <MenuRecursive v-for="item in menus" :key="item.id" v-bind="item" />
      </q-list>
      <!-- <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list> -->
    </q-scroll-area>
    <div class="absolute-top text-center avatar-top">
      <div class="bg-transparent">
        <div class="q-mb-sm avatar-med-circule">
          <!-- <img
            :src="
              $authStore.getUser.fotoUrl == null
                ? 'https://cdn.quasar.dev/img/boy-avatar.png'
                : $authStore.getUser.fotoUrl
            "
          /> -->

          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </div>
        <div class="text-weight-bold">Diego luna</div>
        <div>@rstoenescu</div>
      </div>
    </div>
  </q-drawer>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject, computed, watch } from 'vue';
import { useDrawerStore } from 'src/stores/all';
import MenuRecursive from '../app/components/Sistema/MenuRecursive.vue';
import useHookMenu from '../app/hooks/Sistema/HMenu';
import { useCommonStore } from 'stores/all';


const $drawerStore = useDrawerStore();
const leftDrawerOpen = ref(false);
const bus = inject<any>('bus');

const ShowHidden = (evt: any) => {

  $drawerStore.setToggle();

};
const isOpenDrawer = computed(() => $drawerStore.getLeftDrawer);
watch(
  () => isOpenDrawer.value,
  (newVal) => {
    if (newVal) leftDrawerOpen.value = isOpenDrawer.value;
    else leftDrawerOpen.value = false;
  }
);


const { getAll, menus } = useHookMenu();
const $commonStore = useCommonStore();
// const $authStore = useUserStore();
// const fotoUser = ref<any>(null);

onBeforeMount(async () => {
  try {
    //console.log($authStore.getUser.fotoUrl);
    // fotoUser.value = $authStore.getUser.fotoUrl || {};
    $commonStore.Add_Request();
    await getAll();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
});
</script>
