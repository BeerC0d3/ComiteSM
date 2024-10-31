<template>
  <q-card class="q-mb-sm round-card-6 card-shadow-custom card-border-top" flat bordered>
    <q-item>
      <q-item-section>
        <q-item-label class="text-weight-bold text-primary">{{ props.periodo.nombre }}</q-item-label>
        <q-item-label caption>
          <q-badge :color="props.periodo.claveEstatus == 'ABIERTO' ? 'green' : 'red'">
            {{ props.periodo.estatus }}
          </q-badge>
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn size="12px" flat dense round icon="more_vert" />
      </q-item-section>
    </q-item>

    <q-separator />
    <q-card-actions align="center">

      <q-item clickable>
        <q-item-section>
          <div class="text-center">
            <q-icon color="primary" size="20px" name="fa-solid fa-circle-dollar-to-slot" />
          </div>

          <q-item-label class="text-weight-bold text-primary">Ingresos</q-item-label>
          <q-item-label caption class="text-center"> {{ props.periodo.ingresos }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>

        <q-item-section>
          <div class="text-center">
            <q-icon color="primary" size="20px" name="fa-solid fa-money-check-dollar" />
          </div>

          <q-item-label class="text-weight-bold text-primary">Gastos</q-item-label>
          <q-item-label caption class="text-center">{{ props.periodo.gastos }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>

        <q-item-section>
          <div class="text-center">
            <q-icon color="primary" size="20px" name="fa-solid fa-sack-dollar" />
          </div>

          <q-item-label class="text-weight-bold text-primary">Cooperacion</q-item-label>
          <q-item-label caption class="text-center">$3000.00</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-actions>

  </q-card>
  <!-- <q-card class="q-mb-sm round-card-6 card-shadow-custom card-border-top">
    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle2 text-grey-7">{{ props.periodo.nombre }}</q-item-label>
          <q-item-label class="text-subtitle2 text-grey-7">Ingresos: {{ props.periodo.ingresos }}</q-item-label>
          <q-item-label class="text-subtitle2 text-grey-7">Gastos: {{ props.periodo.gastos }}</q-item-label>
          <q-item-label class="text-subtitle2 text-grey-7">Integrantes: {{ props.periodo.integrantes }}</q-item-label>
        </q-item-section>
        <q-item-section side top>

          <q-item-label class="text-subtitle2">
            <q-badge :color="props.periodo.claveEstatus == 'ABIERTO' ? 'green' : 'red'">
              {{ props.periodo.estatus }}
            </q-badge>
          </q-item-label>
          <div style="margin:15px;">
            <q-icon name="fa-solid fa-chevron-right" color="white" size="25px" />
          </div>
        </q-item-section>


      </q-item>

    </q-card-section>

  </q-card> -->
</template>
<script setup lang="ts">
import { ref, PropType, defineComponent } from 'vue';
import { IPeriodo } from 'src/app/Models/Periodos/IModel';

// import { PropType } from 'vue';

const lorem = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
// interface IPeriodo {
//   Id: number,
//   Nombre: string,
//   ClaveEstatus: string,
//   Estatus: string,
//   Ingresos: string,
//   Gastos: string,
//   Integrantes: number
// }
const props = defineProps({
  periodo: {
    type: Object as PropType<IPeriodo>,
    required: true
  }
})


</script>
