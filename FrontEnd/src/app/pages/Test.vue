<template>
  <q-page padding>
    <page-header>

      <template #title>Test</template>
    </page-header>

    <q-scroll-area class="page-body absolute-top fit">

      <page-body-header>
        <q-knob show-value class="text-light-blue q-ma-md" v-model="value" size="80px" color="light-blue" />
        <q-knob show-value font-size="16px" class="text-red q-ma-md" v-model="value" size="60px" :thickness="0.05"
          color="red" track-color="grey-3">
          <q-icon name="volume_up" class="q-mr-xs" />
          {{ value }}
        </q-knob>
      </page-body-header>
      <page-body-custom>
        <q-card flat class="card-background">
          <q-card-section>
            <p v-for="i in 20" :key="i" class="text-grey-8 text-weight-light">
              Lorems ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate
              aperiam suscipit blanditiis iusto earum, velit adipisci sequi ex
              ipsum, aut non. Doloremque iusto eius at quibusdam blanditiis ex vero
              eaque?
            </p>
          </q-card-section>
        </q-card>

      </page-body-custom>

    </q-scroll-area>

    <page-footer />
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const value = ref(81);
const contentStyle = ref({
  backgroundColor: 'rgba(0,0,0,0.02)',
  color: '#555'
});

const contentActiveStyle = ref({
  backgroundColor: '#eee',
  color: 'black'
});

const thumbStyle = ({
  right: '2px',
  borderRadius: '5px',
  backgroundColor: '#027be3',
  width: '5px',
  opacity: '0.75'
});
</script>
<style></style>
