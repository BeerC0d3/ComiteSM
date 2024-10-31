<template>
  <modal-form>

    <template #seccion-button-save>
      <q-btn flat dense color="primary" label="Guardar" @click="onValidation" />
    </template>
    <template #seccion-title>Agregar usuario</template>
    <template #seccion-form>

      <q-form class="row q-col-gutter-sm" ref="formUsuario" @reset="reset">

        <q-input dense outlined v-model="userModel.nombre" label="Nombre" lazy-rules class="col-lg-12 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input dense outlined v-model="userModel.apellidoPaterno" label="Apellido paterno" lazy-rules
          class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input dense outlined v-model="userModel.apellidoMaterno" label="Apellido materno" lazy-rules
          class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input type="email" dense outlined v-model="userModel.email" label="Email" lazy-rules
          class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input dense outlined v-model="userModel.username" label="Usuario" lazy-rules class="col-lg-12 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input type="password" dense outlined v-model="userModel.password" label="Password" lazy-rules
          class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        <q-input type="password" dense outlined v-model="userModel.password" label="Password" lazy-rules
          class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />



        <div style="width: 100%;">

          <q-select filled v-model="modelMultiple" multiple :options="options" use-chips stack-label
            label="Selecciona el rol" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

        </div>

      </q-form>

    </template>
  </modal-form>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject } from 'vue';
import useHookSeguridad from '../../../auth/hooks/Seguridad/HUsuario';
import useModalMessage from '../../../support/handles/handleModal'
import { useModalStore } from 'stores/all';
import { IUsuarioProperty } from '../../Models/Seguridad/IModel'
import { useCommonStore } from 'stores/all';


const { Show, Hide, GetModal } = useModalMessage();
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const bus = inject<any>('bus');


const userModel = ref<IUsuarioProperty>({
  id: 0,
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email: '',
  username: '',
  password: '',
  roles: ''

});

const formUsuario = ref<any>(null);
const modelMultiple = ref([]);
const options = ref<any>([]);

/**
    * Metodos Vue *
    */
onBeforeMount(async () => {
  await GetRoles();
  // catEstatus.value = catalogosSelect.value;
  roles.value?.forEach(item => {
    options.value.push(item.nombre);
  });
});
/**
 * Fin Metodos Vue *
 */

/**
   *  Hooks *
   */
const { GetRoles, roles, AddUpdate } = useHookSeguridad();
/**
 * Fin Hooks *
 */


const onValidation = async (evt: any) => {
  formUsuario.value.validate().then(async (success: any) => {
    if (success) {
      try {

        $commonStore.Add_Request();
        userModel.value.roles = modelMultiple.value.join().toString();
        await AddUpdate(userModel.value).then((response: any) => {
          formUsuario.value.reset();
          formUsuario.value.resetValidation();
          bus.emit('load-users');
          Show('SUCCESS', 'Exito!', 'El usuario se guardó correctamente');
          $modalStore.HideModal();
        });

      } catch (error: any) {
        $commonStore.Remove_Request();
        Show('ERROR', 'Error', error);
      }
    }
  });
};

const reset = () => {
  userModel.value.nombre = '';
  userModel.value.apellidoPaterno = '';
  userModel.value.apellidoMaterno = '';
  userModel.value.email = '';
  userModel.value.username = '';
  userModel.value.password = '';
  userModel.value.roles = '';

};

</script>
<style>
.q-chip {
  border: 1px solid red;
  background-color: #3748a6;
  color: #fff;
}

.q-chip__icon {
  color: #fff;
}
</style>
