<template>
  <modal-bottom>
    <template #section-1>
      <q-input rounded clearable outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="text"
        placeholder="Buscar persona">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #section-2>

      <q-scroll-area style="height: 200px">

        <q-list v-for="persona in personas" :key="persona.personaId">
          <q-item class="q-mb-sm" clickable v-ripple @click="selectedPersona(persona)">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                A
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ persona.nombre }}</q-item-label>
              <q-item-label caption lines="1">{{ persona.seccion }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced inset />
        </q-list>


      </q-scroll-area>
    </template>
  </modal-bottom>
</template>
<script setup lang="ts">
import { reactive, ref, inject } from 'vue';
import useHookPersona from '../../hooks/MiGente/HPersona'
import { IPersona } from 'src/app/Models/MiGente/IModel';

const emit = defineEmits(['close']);
const bus = inject<any>('bus');
const { getPersonaBySeccionUser, personas } = useHookPersona();
const text = ref('')

getPersonaBySeccionUser(0);

const selectedPersona = (persona: IPersona) => {
  // console.log(persona)
  bus.emit('selected-persona', persona);
  emit('close');
}



</script>
<style lang="scss" >
.q-dialog .container-template {
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
</style>
