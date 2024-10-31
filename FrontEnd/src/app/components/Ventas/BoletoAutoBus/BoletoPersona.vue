<template>
  <div id="swipe-persona">
    <div class="q-slide-item q-item-type overflow-hidden q-mb-sm" v-touch-swipe.mouse.left.prevent="swipeLeft"
      v-touch-swipe.mouse.right.prevent="swipeRight"
      style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);border-radius: 15px;">
      <div class="q-slide-item__right absolute-full row no-wrap items-center justify-end"
        :style="`visibility:${visibility};`">
        <div :style="`transform: scale(${scale}); height:100%;`">
          <q-btn flat icon="more_horiz" label="Mas" color="white" size="1em" class="upper" style="height:100%;" />
          <!-- <q-btn flat icon="delete" color="white" size="1em" label="Eliminar" class="upper" /> -->
          <q-btn flat icon="fa-solid fa-sack-dollar" color="white" size="1em" label="Ingreso" class="upper"
            style="height:100%;" />

        </div>
      </div>
      <div class="q-slide-item__content"
        :style="`transform: translate3d(${itemOffset}px,0px,0px);border-top-right-radius: 10px;border-bottom-right-radius: 10px`">
        <div class="q-item q-item-type row no-wrap" role="listitem">
          <div class="q-item__section column q-item__section--side justify-center q-item__section--avatar">
            <div class="q-avatar">

              <div class="q-avatar__content row flex-center overflow-hidden">
                <q-icon name="fa-solid fa-user" color="primary" size="1.8em" />
              </div>
            </div>
          </div>
          <div class="q-item__section column q-item__section--main justify-center">
            <p class="text-primary text-subtitle2">{{ props.persona.nombrePersona }}</p>
            <p class="text-grey-6 text-caption">No. Boletos: {{ props.persona.totalBoletos }} </p>
            <!-- <p class="text-grey-6 text-caption">Total adeudo: $550 </p> -->
            <p class="text-grey-6 text-caption">Total: {{ props.persona.costoTotal }} </p>
            <!-- <p class="text-grey-6 text-caption">Cooperación {{ $props.persona.totalCooperacion }} </p> -->
          </div>
          <div class="q-item__section column q-item__section--side justify-top text-subtitle2">
            <q-badge :color="props.persona.claveEstatus == 'PAGADO' ? 'green' : 'orange'">
              {{ props.persona.estatus }}
            </q-badge>
          </div>
          <div class="q-item__section column  justify-center text-subtitle2">
            <q-icon name="fa-solid fa-chevron-right" color="grey" size="1.8em" />
          </div>


        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends Object">
import { ref, PropType, defineProps } from 'vue';
import { useQuasar } from 'quasar'
import { IVentaBoleto } from '../../../Models/Ventas/BoletoBus/IModel'
// import { useModalStore, useCommonStore } from 'stores/all';

let itemOffset = ref(0);
let scale = ref(0)
let visibility = ref('hidden')
const $q = useQuasar()
// const $modalStore = useModalStore();

const props = defineProps({
  persona: {
    type: Object as PropType<IVentaBoleto>,
    required: true
  },
  // delete: {
  //   type: Function,
  //   required: true,

  // },
  // edit: {
  //   type: Function,
  //   required: true,

  // },


})

const swipeLeft = (obj: any) => {

  itemOffset.value = -185

  scale.value = 1;
  visibility.value = 'visible'
  // }
}
const swipeRight = (obj: any) => {

  itemOffset.value = 0;
  scale.value = 0;
}
const clickModal = (personaId: number) => {

  // props.modalMonto(personaId);
}
</script>
<style lang="scss">
#swipe-persona {
  @import '../../../../assets/app-swipe.scss';
}
</style>
