<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Cooperación</template>
    </page-header>
    <header-amount>
      <template #title-left>Cooperación</template>
      <template #amount-left>3500.00</template>
      <template #button-right>
        <q-btn color="primary" icon="fa-solid fa-circle-plus" flat size="20px" to="/app/Ingresos/MiCooperacion" />
      </template>

    </header-amount>
    <page-body>
      <div style="height: 150px !important;"></div>
      <div class="q-pa-xs">
        <!-- <q-scroll-area :style="`height: ${calcHeight}px;`"> -->
        <q-card class="my-card" style="border-radius: 15px;box-shadow: 0 1px 3px 0 rgba(0,0,0,0.09);">
          <q-card-section>
            <useCompListCooperacionUsers />
          </q-card-section>
        </q-card>

      </div>
    </page-body>
  </q-page>
</template>
<script setup lang="ts">
import useCompListCooperacionUsers from 'src/app/components/Ingresos/CompListCooperacionUser.vue'
</script>
