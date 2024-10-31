<template>
  <modal-maximized>
    <template #section-title>Mi gente</template>
    <template #section-1>
      <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
        placeholder="Busca persona">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #section-body>
      <q-list v-for="persona in personas" :key="persona.personaId">
        <q-item class="q-mb-sm" clickable v-ripple @click="selectedPersona(persona)">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              A
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary">{{ persona.nombre }}</q-item-label>
            <q-item-label caption lines="1">{{ persona.seccion }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </q-list>


    </template>
  </modal-maximized>
</template>
<script setup lang="ts">
import { ref, inject, onBeforeMount } from 'vue';
import useHookPersona from '../../hooks/MiGente/HPersona'
import { IPersona } from 'src/app/Models/MiGente/IModel';
import { useModalStore } from '../../../stores/all';


const emit = defineEmits(['close']);
const bus = inject<any>('bus');
const text = ref('');

const { getPersonaBySeccionUser, personas } = useHookPersona();
const $modalStore = useModalStore();

onBeforeMount(async () => {
  await getPersonaBySeccionUser(0);
})


const selectedPersona = (persona: IPersona) => {
  // console.log(persona)
  bus.emit('selected-persona', persona);
  $modalStore.HideModal();
  //emit('close');
}


</script>
