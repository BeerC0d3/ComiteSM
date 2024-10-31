<template>
  <div id="seccion-swiper">
    <swiper :slides-per-view="3" :space-between="10" @swiper="onSwiper" @slideChange="onSlideChange">

      <swiper-slide v-for="seccion in listSeccion " :key="seccion.id">
        <q-chip @click="clickClip(seccion.id)" :id="`chip-${seccion.id}`" v-model:selected="seccion.selected"
          text-color="text-grey-14" :icon="props.icon">
          <div class="ellipsis">
            {{ seccion.nombre }}

          </div>

        </q-chip>
      </swiper-slide>

    </swiper>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType, computed, watch, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ISwiper } from '../../Models/Sistema/IModel'

const listSeccion = reactive<ISwiper[]>([])

const props = defineProps({
  data: {
    type: Array as PropType<Array<ISwiper>>,
    required: true,
    default: () => []
  },
  getChecks: {
    type: Function,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: 'fa-solid fa-eye-slash'
  },
})

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

const fillData = () => {
  addFirst();
  checkedFirst();
  props.data.forEach((item) => {
    item.selected = false;
    listSeccion.push(item);
  })
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

const seccionChecked = computed(() => {

  return listSeccion.filter(item => item.selected)
    .map(seccion => seccion.id);

});

const containData = computed(() => {
  return props.data.length
})

const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const clickClip = (seccionId: number) => {
  unChecked();
  setChecked(seccionId);
}

watch(
  () => containData.value,
  (newVal) => {
    if (newVal) {
      console.log('nueva data')
      console.log(newVal)
      fillData();
    }
  }
);

watch(
  () => seccionChecked.value,
  (newVal) => {
    if (newVal) props.getChecks(newVal);
  }
);

</script>
<style lang="scss">
#seccion-swiper {
  @import '../../../assets/app-seccion-swiper.scss';
}
</style>
