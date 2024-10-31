<template>
  <q-dialog v-model="isShow" persistent :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down" @hide="(value) => SetState(value)">
    <q-card class="text-primary card-bg">

      <header id="header-master"
        class="page-header app-header q-header q-layout__section--marginal fixed-top q-header--bordered absolute-top header-tool">
        <div class="container-template">
          <q-toolbar>
            <div class="q-toolbar row no-wrap text-grey-10 items-center">
              <q-btn dense flat icon="chevron_left" size="20px" v-close-popup>
                <!-- <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip> -->
              </q-btn>
            </div>
            <div class="page-header-title q-toolbar__title ellipsis text-grey-10 text-h6 q-pl-none">
              <slot name="section-title" />
            </div>
          </q-toolbar>

        </div>
      </header>


      <!-- <q-card-section>
        <div class="content-seccion-fixed">
          <div class="container-template text-grey-10 text-subtitle2">
            <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">
                <swiper-slide>
                  <span class="swiper-item active"> Todos</span>
                </swiper-slide>
                <swiper-slide>
                  La reforma
                </swiper-slide>
                <swiper-slide>
                  San Agustin
                </swiper-slide>
                <swiper-slide class="overflow-ellipsis">
                  San Agustin-Locomotora
                </swiper-slide>

              </swiper>
          </div>
        </div>
      </q-card-section> -->
      <q-card-section class="content-search-fixed">
        <div class="container-template">
          <!-- <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
            placeholder="Busca persona">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input> -->

          <slot name="section-1" />

        </div>

      </q-card-section>
      <q-card-section class="content-list">
        <!-- <div class="container-template">
          <q-card class="my-card text-grey-10" style="border-radius: 15px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);">
            <q-card-section>
              <p v-for="i in 20" :key="i">
                Lorems-{{ i }} ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
                aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex
                ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero
                eaque?
              </p>


            </q-card-section>
          </q-card>
        </div> -->
        <div class="container-template">
          <q-card class="my-card text-grey-10" style="border-radius: 15px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);">
            <q-card-section>
              <slot name="section-body" />
            </q-card-section>
          </q-card>

        </div>

      </q-card-section>
    </q-card>

  </q-dialog>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useModalStore } from 'stores/all';


const maximizedToggle = ref(true);
const text = ref('');

const isShow = ref(false);
const $modalStore = useModalStore();


const SetState = (evt: any) => {
  $modalStore.HideModal();

};
const isShowComputed = computed(() => $modalStore.stateShow);

watch(
  () => isShowComputed.value,
  (newVal) => {
    if (newVal)
      isShow.value = isShowComputed.value;
    else isShow.value = false;

  }
);
</script>
<style lang="scss" scoped>
.q-dialog {
  @import 'src/assets/app.scss';
}

.card-bg {

  // background: #E4E9F5 !important;
  background: #fff !important;
}

.q-bar {
  background: #fff;
  // background: #4B5EB2;

}

.header-tool {
  position: fixed;
  // background: #4B5EB2 !important;
  background: #fff !important;
}

.tool-bar-fixed {
  position: fixed;
  z-index: 10;
  // max-width: 650px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 100%;
}

.content-seccion-fixed {
  // background: #4B5EB2;
  background: #fff;
  color: #fff;
  z-index: 20;
  position: fixed;
  margin: 0 auto;
  top: 50px;
  left: 0;
  right: 0;
  padding: 12px 5px;
}

.content-search-fixed {
  // background: #4B5EB2;
  background: #fff;
  z-index: 30;
  position: fixed;
  margin: 0 auto;
  // top: 95px;
  top: 50px;
  left: 0px;
  right: 0px;
  padding: 12px 5px;
}

.content-list {
  position: relative;
  top: 120px;
}
</style>
