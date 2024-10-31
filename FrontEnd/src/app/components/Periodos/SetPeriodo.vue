<template>
  <div></div>
</template>
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useCommonStore, usePeriodoSelected } from 'stores/all';
import useHookPeriodo from '../../hooks/Periodos/Index'

const $periodoStore = usePeriodoSelected();
const $commonStore = useCommonStore();

const { getAll, periodos } = useHookPeriodo();

onBeforeMount(async () => {
  try {
    $commonStore.Add_Request();
    await getAll();
    setPeriodoActive();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
});


const setPeriodoActive = () => {
  //console.log('setPeriodoActive()')
  // console.log(periodos.value)
  periodos.value?.forEach(item => {
    if (item.claveEstatus == 'ABIERTO')
      $periodoStore.setPeriodoSelected(item.id, item.claveEstatus);

  });

};

</script>
