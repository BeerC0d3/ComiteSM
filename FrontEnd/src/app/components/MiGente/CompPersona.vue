<template>
  <div id="swipe-persona">
    <div class="q-slide-item q-item-type overflow-hidden q-mb-sm" v-touch-swipe.mouse.left.prevent="swipeLeft"
      v-touch-swipe.mouse.right.prevent="swipeRight"
      style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);border-radius: 15px;">
      <div class="q-slide-item__right absolute-full row no-wrap items-center justify-end"
        :style="`visibility:${visibility};`">
        <div :style="`transform: scale(${scale});`">
          <q-btn flat icon="more_horiz" label="Mas" color="white" size="1em" class="upper" v-show="!props.showAmount" />
          <!-- <q-btn flat icon="delete" color="white" size="1em" label="Eliminar" class="upper" /> -->
          <q-btn flat icon="fa-solid fa-sack-dollar" color="white" size="1em" label="Ingreso" class="upper"
            v-show="props.showAmount" @click.prevent.stop="clickModal(props.persona.personaId)" />

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

            <p class="text-primary text-subtitle2">{{ props.persona.nombre }}</p>
            <p class="text-grey-6 text-caption">{{ props.persona.seccion }} </p>
            <!-- <p class="text-grey-6 text-caption">Cooperación {{ $props.persona.totalCooperacion }} </p> -->
          </div>
          <div class="q-item__section column q-item__section--side justify-center text-subtitle2"
            v-show="props.showAmount">{{ props.persona.monto }}</div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends Object">
import { ref, PropType, defineProps } from 'vue';
import { useQuasar } from 'quasar'
import { IPersona, IPersonaCooperacion } from '../../Models/MiGente/IModel'
import { useModalStore, useCommonStore } from 'stores/all';

let itemOffset = ref(0);
let scale = ref(0)
let visibility = ref('hidden')
const $q = useQuasar()
const $modalStore = useModalStore();

const props = defineProps({
  persona: {
    type: Object as PropType<T>,
    required: true
  },
  delete: {
    type: Function,
    required: true,

  },
  edit: {
    type: Function,
    required: true,

  },
  showAmount: {
    type: Boolean,
    required: true,
    default: false,
  },
  modalMonto: {
    type: Function,
    required: true,

  }

})

// const props = defineProps({
//   persona: {
//      type: Object  as PropType<IPersona>,
//     required: true
//   },
//   delete: {
//     type: Function,
//     required: true,

//   },
//   edit: {
//     type: Function,
//     required: true,

//   },
//   showAmount: {
//     type: Boolean,
//     required: true,
//     default: false,
//   }

// })

const swipeLeft = (obj: any) => {
  // console.log(obj)
  // if (obj.distance.x >= 5) {
  if (props.showAmount)
    itemOffset.value = -100
  else
    itemOffset.value = -185


  scale.value = 1;
  visibility.value = 'visible'
  // }
}
const swipeRight = (obj: any) => {

  itemOffset.value = 0;
  scale.value = 0;
  //visibility.value = 'hidden'
}
const clickModal = (personaId: number) => {
  //$modalStore.ShowModal(personaId);
  props.modalMonto(personaId);
}
</script>
<style lang="scss">
#swipe-persona {
  // @import '../assets/app-swipe.scss';
  @import '../../../assets/app-swipe.scss';
}
</style>
