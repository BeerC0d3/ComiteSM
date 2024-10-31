<template>
  <q-page padding>
    <page-header>

      <template #title>Periodos</template>
    </page-header>

    <q-scroll-area class="page-body absolute-top fit">

      <page-body-header>
        <p class="text-grey-12">Lista de periodos</p>
        <!-- <q-separator color="red" /> -->

        <q-toolbar>
          <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
            placeholder="Busca periodo">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <!-- <q-btn round icon="add" color="red" size="1em" @click="clickShow" /> -->
          <q-btn round icon="add" color="red" to="/app/Periodos/add-edit" size="1em" />
          <!-- <q-btn round icon="add" color="red" to="/app/Periodos/add-edit" size="1em" /> -->
        </q-toolbar>
      </page-body-header>
      <page-body-custom>
        <q-card flat class="card-background">
          <q-card-section>
            <empty-data icon="fa-solid fa-pager" label="No hay ningún periodo." v-if="periodos?.length == 0" />
            <div v-for="item in periodos" :key="item.id">
              <comp-periodo :periodo="item" />
            </div>


          </q-card-section>
        </q-card>


      </page-body-custom>

    </q-scroll-area>

    <page-footer />

  </q-page>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import CompPeriodo from '../../components/Periodos/ListPeriodo.vue'
import useHookPeriodo from '../../hooks/Periodos/Index'
import { useCommonStore } from 'stores/all';


const text = ref('')
const title = ref('hola');
const show = ref(false);
const clickShow = () => {
  console.log('clickZZ')
  show.value = true;
}

const $commonStore = useCommonStore();

const { getAll, periodos } = useHookPeriodo();

onBeforeMount(async () => {
  try {
    $commonStore.Add_Request();
    await getAll();
  } catch (e) {
    $commonStore.Remove_Request();
    console.log(e);
  }
});

</script>
<style>
.btn-floating {
  display: inline-block;
  position: fixed;
  right: 0px;
  bottom: 10px;
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 1s;
  animation-name: fadeIn;
  animation-duration: 1s;
  z-index: 998;

}
</style>
