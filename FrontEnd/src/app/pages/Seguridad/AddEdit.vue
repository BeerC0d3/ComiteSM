<!-- <script src="../../DataAccess/Seguridad/userCrudRepository.ts?V=3" /> -->

<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Agregar usuario</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">
        <q-card flat bordered class="round-card-6">
          <q-card-section>
            <q-item-label class="text-center text-grey-7">Agregar usuario</q-item-label>
            <q-separator vertical class="q-mb-sm" />
            <q-form class="row q-col-gutter-sm" ref="formUsuario">

              <q-input dense outlined v-model="text" label="Nombre" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input dense outlined v-model="text" label="Apellido paterno" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input dense outlined v-model="text" label="Apellido materno" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input type="email" dense outlined v-model="text" label="Email" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input dense outlined v-model="text" label="Usuario" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input type="password" dense outlined v-model="text" label="Password" lazy-rules
                class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input type="password" dense outlined v-model="text" label="Repite-Password" lazy-rules
                class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <div style="width: 100%;">

                <q-select filled v-model="modelMultiple" multiple :options="options" use-chips stack-label
                  label="Selecciona el rol" />

              </div>

            </q-form>
            <q-separator color="red" />

          </q-card-section>
        </q-card>




      </div>
    </page-body>

    <q-footer bordered class="bg-footer footer-radius-10 ">
      <div class="container-template">
        <q-card-actions align="center" class="flex">
          <q-btn unelevated rounded color="orange" class="full-width-50" @click="show">Cancelar</q-btn>
          <q-btn unelevated rounded color="primary" class="full-width-50" @click="onValidation">Guardar</q-btn>

        </q-card-actions>

      </div>
    </q-footer>

  </q-page>
</template>


<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import useHookSeguridad from '../../../auth/hooks/Seguridad/HUsuario';
import * as showAlert from '../../../support/utils/Alert'

const text = ref('');
const formUsuario = ref<any>(null);
const modelMultiple = ref([]);
// const options = ref([
//   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
// ]);
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
const { GetRoles, roles } = useHookSeguridad();


/**
 * Fin Hooks *
 */

const show = () => {
  showAlert.alertSuccess('Gestión de usuarios', 'perfecto');
}

const onValidation = async (evt: any) => {
  //console.log('form');
  formUsuario.value.validate().then(async (success: any) => {
    if (success) {
      //console.log(periodoObject.value);
      try {
        console.log('exelente form usuario');
      } catch (e) {
        //$commonStore.Remove_Request();
        //HandlError(e);
      }
    }
  });
};

</script>
