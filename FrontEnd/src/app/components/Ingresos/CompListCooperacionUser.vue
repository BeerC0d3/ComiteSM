<template>
  <q-list separator>
    <q-item v-for="contact in CooperacionUsers" :key="contact.id" class="q-my-sm q-mb-sm" clickable v-ripple>
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
        <span class="text-weight-bold text-grey-10">$3400,00</span>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup lang="ts">
const CooperacionUsers = [{
  id: 1,
  nombre: 'Arturo Maldonado',
  rol: 'rjedrzej0@discuz.net',
  letter: 'A'
}, {
  id: 2,
  nombre: 'Diego Luna Olea',
  rol: 'rjedrzej0@discuz.net',
  letter: 'D'
}, {
  id: 3,
  nombre: 'Diuvaldo Salazar',
  rol: 'rjedrzej0@discuz.net',
  letter: 'D'
}, {
  id: 4,
  nombre: 'Vicente Lucero',
  rol: 'rjedrzej0@discuz.net',
  letter: 'V'
},

{
  id: 5,
  nombre: 'Leonides Merino',
  rol: 'rjedrzej0@discuz.net',
  letter: 'M'
},




]
</script>
