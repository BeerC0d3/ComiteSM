<template>
  <q-list separator>
    <q-item v-for="contact in CooperacionPersona" :key="contact.id" class="q-my-sm q-mb-sm" clickable v-ripple>
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ contact.letter }}
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-primary text-subtitle2">{{ contact.nombre }}</q-item-label>
        <q-item-label caption lines="1">{{ contact.rol }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <span class="text-weight-bold text-grey-10">{{ contact.monto }}</span>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false);
const maximizedToggle = ref(true);

const CooperacionPersona = [{
  id: 1,
  nombre: 'Humberto Daza salas',
  rol: 'rjedrzej0@discuz.net',
  letter: 'A',
  monto: '$500.00'
}, {
  id: 2,
  nombre: 'Sabina salas',
  rol: 'rjedrzej0@discuz.net',
  letter: 'D',
  monto: '$200.00'
}, {
  id: 3,
  nombre: 'David Emiliano Salas Luna',
  rol: 'rjedrzej0@discuz.net',
  letter: 'D',
  monto: '$150.00'
}, {
  id: 4,
  nombre: 'Patricia Salas Luna',
  rol: 'rjedrzej0@discuz.net',
  letter: 'V',
  monto: '$300.00'
},

{
  id: 5,
  nombre: 'Jovita luna Salazar',
  rol: 'rjedrzej0@discuz.net',
  letter: 'M',
  monto: '$400.00'
},




]
</script>
