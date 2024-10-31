<template>
  <div id="seccion-swiper">
    <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">

      <swiper-slide v-for="seccion in listSeccion " :key="seccion.id">
        <q-chip @click="clickClip(seccion.id)" :data-seccionid="seccion.id" :id="`chip-${seccion.id}`"
          v-model:selected="seccion.selected" text-color="text-grey-14" icon="fa-solid fa-location-dot">
          <div class="ellipsis">
            {{ seccion.nombre }}
            <!-- <q-tooltip>{{ seccion.nombre }}</q-tooltip> -->
          </div>

        </q-chip>
      </swiper-slide>

    </swiper>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, watch, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ISeccionSwiper } from '../../Models/Secciones/IModel'
import useHookSeccion from '../../hooks/Secciones/HSeccion'
import { NumberOptions } from 'vue-i18n';


const listSeccion = reactive<ISeccionSwiper[]>([])
const newActiveSeccion = ref<number | undefined>(0)

const list = reactive([])
const { GetSeccionByuser, seccionesByUserSwipe } = useHookSeccion();

const props = defineProps({

  getChecks: {
    type: Function,
    required: true,
  },
})

onBeforeMount(async () => {
  addFirst();
  checkedFirst();
  await GetSeccionByuser();
  // Object.assign(list, seccionesByUserSwipe.value)
  seccionesByUserSwipe.value?.forEach((item) => {
    item.selected = false;
    listSeccion.push(item);
  })

  // console.log('onBeforeMount swiper')

});


const addFirst = () => {
  listSeccion.push({
    id: 0,
    nombre: 'Todas',
    selected: false
  })
}

const checkedFirst = () => {
  listSeccion[0].selected = true;

}

const setChecked = (seccionId: number) => {
  listSeccion.forEach((item => {
    item.selected = item.id == seccionId ? true : false;
  }))
}
const unChecked = () => {
  listSeccion.forEach((item => {
    item.selected = false
  }))
}
//----para todos en join-------
// const seccionChecked = computed(() => {
//   return listSeccion.filter(item => item.selected)
//     .map(seccion => seccion.id)
//     .join()
//     .toString();

// });
const seccionChecked = computed(() => {

  return listSeccion.filter(item => item.selected)
    .map(seccion => seccion.id);

});

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const clickClip = (seccionId: number) => {
  // const elementSeccion = event.target.offsetParent;
  // const seccionId = elementSeccion.dataset.seccionid;
  unChecked();
  setChecked(seccionId);
}


watch(
  () => seccionChecked.value,
  (newVal, oldval) => {
    if (newVal) {

      //console.log('newActiveSeccion=>' + newVal)
      props.getChecks(newVal);

    }
  }
);

</script>
<style lang="scss">
#seccion-swiper {
  @import '../../../assets/app-seccion-swiper.scss';
}
</style>
