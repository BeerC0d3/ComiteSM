<template>
  <div>
    <div v-if="menuHijos.length == 0">
      <q-item :to="url" clickable v-ripple class="q-item-active">
        <q-item-section avatar class="item-bt">
          <q-avatar>
            <q-icon :name="icono" class="icon-color" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ titulo }}</q-item-section>
      </q-item>
    </div>
    <div v-else>
      <div v-if="menuHijos.length > 0">
        <q-expansion-item :hide-expand-icon="id == 1" :disable="id == 1" :icon="icono" :label="titulo"
          :default-opened="id == 1">
          <menu-recursive v-for="child in menuHijos" :key="child.id" v-bind="child">
          </menu-recursive>
        </q-expansion-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple>
          <q-item-section>{{ titulo }}</q-item-section>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IMenu } from '../../Models/Sistema/IModel';

interface Props {
  id: number;
  titulo: string;
  url: string;
  icono: string;
  menuHijos: IMenu[];
}

const props = withDefaults(defineProps<Props>(), {
  menuHijos: () => [],
});
</script>

<style scoped>
.q-expansion-item {
  border-bottom: 1px dashed #fff;
}

.icon-color {
  color: #fff;
}

.q-focusable .q-hoverable .q-item-active {
  background-color: #5dc697;
  color: #fff;
}

.q-item.q-router-link--active,
.q-item--active {
  color: #fff;
}

.q-item__section--side {
  color: #fff;
}

.q-item__section--main~.q-item__section--side {
  color: #fff;
}
</style>
