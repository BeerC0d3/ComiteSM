<template>
  <div id="swipe-seccion">
    <div class="q-slide-item q-item-type overflow-hidden q-mb-sm" v-touch-swipe.mouse.left.prevent="swipeLeft"
      v-touch-swipe.mouse.right.prevent="swipeRight"
      style="box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);border-radius: 15px;">
      <div class="q-slide-item__right absolute-full row no-wrap items-center justify-end"
        :style="`visibility:${visibility};`">
        <div :style="`transform: scale(${scale});`">
          <q-btn flat icon="more_horiz" label="Mas" color="white" size="1em" class="upper"
            @click.stop="showBottom(false, props.seccion.id)" />
          <!-- <q-btn flat icon="delete" color="white" size="1em" label="Eliminar" class="upper" /> -->
          <q-btn flat icon="fa-solid fa-share" color="white" size="1em" label="Compartir" class="upper" />

        </div>
      </div>
      <div class="q-slide-item__content" :style="`transform: translate3d(${itemOffset}px,0px,0px);`">
        <div class="q-item q-item-type row no-wrap" role="listitem">
          <div class="q-item__section column q-item__section--side justify-center q-item__section--avatar">
            <div class="q-avatar">
              <div class="q-avatar__content row flex-center overflow-hidden">
                <q-icon name="fa-solid fa-location-dot" color="primary" size="1.8em" />
              </div>
            </div>
          </div>
          <div class="q-item__section column q-item__section--main justify-center">
            <p class="text-primary text-subtitle2">{{ props.seccion.nombre }}</p>
            <p class="text-grey-6 text-caption">{{ props.seccion.totalPersonas }} personas en esta sección</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, PropType, defineProps } from 'vue';
import { useQuasar } from 'quasar'
import { ISeccion } from '../../Models/Secciones/IModel'
let itemOffset = ref(0);
let scale = ref(0)
let visibility = ref('hidden')
const $q = useQuasar()


const props = defineProps({
  seccion: {
    type: Object as PropType<ISeccion>,
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

})
const swipeLeft = (obj: any) => {
  // console.log(obj)
  // if (obj.distance.x >= 5) {
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
const swipeReset = () => {
  itemOffset.value = 0;
  scale.value = 0;
}
const showBottom = (grid, id) => {
  $q.bottomSheet({
    message: 'Opciones sección',
    grid,
    actions: [

      {
        label: 'Editar',
        icon: 'fa-solid fa-file-pen',
        color: 'orange',
        id: id
      },
      {
        label: 'Eliminar',
        icon: 'delete',
        color: 'red',
        id: id
      },


    ]
  }).onOk(action => {
    //onsole.log('Action chosen:', action.id)
    swipeReset();
    if (action.label == 'Eliminar')
      props.delete(action.id);
    if (action.label == 'Editar')
      props.edit(action.id);

  }).onCancel(() => {
    // console.log('Dismissed')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}
</script>
<style lang="scss">
#swipe-seccion {
  // @import '../assets/app-swipe.scss';
  @import '../../../assets/app-swipe.scss';
}
</style>
