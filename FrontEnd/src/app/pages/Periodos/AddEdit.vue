<script src="../../DataAccess/Periodos/periodoRepository.ts" />

<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="Periodos" />
      </template>
      <template #title></template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">

        <!-- <p class="text-h6">Agregar</p> -->
        <q-card flat bordered class="round-card-6">
          <q-card-section>
            <q-item-label class="text-center text-grey-7">Agregar Periodo</q-item-label>
            <q-separator vertical class="q-mb-sm" />
            <q-form class="row q-col-gutter-sm" ref="formPeriodo" @reset="reset">

              <q-input dense outlined v-model="periodoObject.nombre" label="Nombre" lazy-rules class="col-lg-12 col-xs-12"
                :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-input :type="type" dense outlined v-model="periodoObject.Monto" label="Ingreso" lazy-rules
                class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
                @focus="onFocus" @blur="onBlur" />

              <q-select dense outlined class="col-lg-12 col-xs-12" v-model="periodoObject.estatusId" :options="catEstatus"
                option-label="descripcion" option-value="id" label="Estatus" emit-value map-options
                :rules="[(val) => !!val || 'Seleccione estatus']" />

            </q-form>

            <q-separator />

            <comp-user :getUserCheck="getCheck" title="Integrantes" :show-check="true" />


            <q-card-actions align="center">
              <q-btn unelevated rounded color="primary" class="full-width" @click="onValidation">Guardar</q-btn>

            </q-card-actions>
          </q-card-section>

        </q-card>


      </div>

    </page-body>

    <page-footer />
  </q-page>
</template>
