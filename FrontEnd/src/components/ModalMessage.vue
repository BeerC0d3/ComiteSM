<template>
  <q-dialog v-model="isShow" persistent>
    <q-card class="modal-message border-modal-message">
      <q-card-section>
        <div class="card-icon-message text-center">
          <q-btn round dense :icon="switchModal('ICON')?.icon" :color="switchModal('COLOR')?.color" size="2em" />

        </div>

      </q-card-section>
      <q-card-section class="q-pt-none text-grey-14">
        <p class="text-h6 text-center">{{ props.modal.title }}</p>
        {{ props.modal.message }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn rounded label="OK" :color="switchModal('COLOR')?.color" class="full-width" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref, computed, watch, PropType } from 'vue';
import { IModaleMessage } from 'src/app/Models/Sistema/IModel';


const props = defineProps({
  modal: {
    type: Object as PropType<IModaleMessage>,
    required: true
  }
})

const isShow = ref(false);
const emit = defineEmits(['close']);

const switchModal = (property: string) => {

  let icon = '';
  let color = '';
  switch (property) {
    case 'ICON':
      if (props.modal.typeMessageClave == 'SUCCESS')
        icon = 'fa-solid fa-circle-check';
      if (props.modal.typeMessageClave == 'ERROR')
        icon = 'fa-solid fa-circle-xmark';
      break;
    case 'COLOR':
      if (props.modal.typeMessageClave == 'SUCCESS')
        color = 'green';
      if (props.modal.typeMessageClave == 'ERROR')
        color = 'red';
      break;
  }

  return {
    icon,
    color,
  }

}

const isShowComputed = computed(() => props.modal.Show);
watch(
  () => isShowComputed.value,
  (newVal) => {
    if (newVal) {
      isShow.value = true;
      emit('close');

    }

  }
);

</script>
