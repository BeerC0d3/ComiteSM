<template>
  <q-page padding>
    <page-header>
      <template #buttons-left>
        <page-header-btn-back label="" />
      </template>
      <template #title>Vender boleto</template>
    </page-header>
    <page-body>
      <div class="q-pa-lg">
        <q-card flat bordered class="round-card-6">
          <q-card-section>

            <span class="text-h6">Lista de boletos </span>

            <q-separator color="primary" class="q-mb-sm" />
            <q-list style="width: 100%;background-color:white;" v-for="ticket in listticket" :key="ticket.id">
              <q-item clickable v-ripple :active="ticket.selected" active-class="my-menu-link"
                @click="clickTicket(ticket.id)">

                <q-item-section>
                  <q-item-label class="text-primary text-subtitle2">{{ ticket.tipoBoleto }}</q-item-label>
                  <q-item-label caption lines="1">${{ ticket.precio }}</q-item-label>
                </q-item-section>

                <q-item-section>
                  <div class="item-add-minus">

                    <q-btn class="item-border" dense flat color="primary" icon="fa-solid fa-minus"
                      :disable="ticket.cantidad >= 1 ? false : true" @click.prevent.stop="decrementTicket(ticket.id)" />
                    <q-input readonly dense outlined v-model="ticket.cantidad" class="text-center" />
                    <q-btn class="item-border" dense flat color="primary" icon="fa-solid fa-plus"
                      :disable="!ticket.selected" @click.prevent.stop="incrementTicket(ticket.id)" />

                  </div>
                </q-item-section>


                <!-- <q-item-section side>
                  <q-btn round dense flat color="red" icon="delete" />
                </q-item-section> -->


              </q-item>
              <q-separator spaced inset />
            </q-list>

            <q-form class="row q-col-gutter-sm" ref="formVentaBoleto">
              <q-input dense outlined v-model="ventaBoleto.nombrePersona" label="Nombre" lazy-rules
                class="col-lg-12 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
                stack-label>
                <template v-slot:append>
                  <q-btn round dense flat icon="search" @click="clickModalForm" />
                </template>
              </q-input>
              <q-input type="number" dense outlined v-model="text" label="Monto" lazy-rules
                class="col-lg-6 col-md-6 col-xs-12" :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']" />

              <q-select dense outlined class="col-lg-6 col-md-6 col-xs-12" v-model="text" option-label="descripcion"
                option-value="id" label="Estatus" emit-value map-options
                :rules="[(val) => !!val || 'Seleccione estatus']" />
            </q-form>


          </q-card-section>
        </q-card>
      </div>

    </page-body>
    <q-footer class="bg-footer">
      <div class="container-template ticket-view-margin">
        <div class="ticket-view-total">
          <ul>
            <li>
              <span class="text-grey-13">Monto</span>
              <span class="text-primary">{{ formatMonto(montoTotal.monto) }}</span>
            </li>
            <li>
              <span class="text-grey-13">Adeudo</span>
              <span class="text-primary">{{ formatMonto(montoTotal.adeudo) }}</span>
            </li>
            <li>
              <span class="text-h5">Total</span>
              <span class="text-h5">{{ formatMonto(montoTotal.total) }}</span>
            </li>
          </ul>
        </div>
        <div class="footer-btn">
          <q-btn unelevated rounded class="full-width" color="primary" label="Guardar" />
        </div>
      </div>

    </q-footer>
    <!-- <useSelectPersonaModal /> -->
    <!-- <modal-maximized /> -->
    <useBuscaPersonaModal />

  </q-page>
</template>
<script setup lang="ts">
import { ref, inject, reactive, computed, watch } from 'vue';
import { useModalStore } from 'stores/all';
import useBuscaPersonaModal from '../../../components/MiGente/BuscadorPersona.vue'
import { IPersona } from 'src/app/Models/MiGente/IModel';
import { IVentaBoletoProperty, IVentaBoletoDetalle, IVentaBoletoTotal } from 'src/app/Models/Ventas/BoletoBus/IModel';


const bus = inject<any>('bus');
const $modalStore = useModalStore();
const text = ref('');
const clickIncrementaDecrementa = ref('');
const montoTotal = reactive<IVentaBoletoTotal>({
  monto: 0,
  adeudo: 0,
  total: 0
});

const ventaBoleto = reactive<IVentaBoletoProperty>({
  id: 0,
  nombrePersona: '',
  periodoId: 0,
  personaId: 0,
  estatusId: 0
})
const listticket = reactive<IVentaBoletoDetalle[]>([
  {
    id: 1,
    tipoBoleto: 'Boleto redondo',
    precio: 550.00,
    cantidad: 0,
    selected: false
  },
  {
    id: 2,
    tipoBoleto: 'Boleto solo ida',
    precio: 300.00,
    cantidad: 0,
    selected: false,
  },
  {
    id: 3,
    tipoBoleto: 'Boleto solo vuelta',
    precio: 300.00,
    cantidad: 0,
    selected: false,
  }


])

bus.on('selected-persona', async (persona: IPersona) => {
  //console.log(persona)
  ventaBoleto.nombrePersona = persona.nombre;
  ventaBoleto.personaId = persona.personaId;
});
const clickTicket = (boletoId: number) => {
  const itemTicket = listticket.find((item) => item.id == boletoId) as IVentaBoletoDetalle;
  setCheckedUnchecked(boletoId, !itemTicket.selected)
}
const setCheckedUnchecked = (boletoId: number, checked: boolean) => {

  listticket.forEach((item) => {
    if (item.id == boletoId) {
      item.selected = checked;
      item.cantidad = !checked ? 0 : item.cantidad
    }
  })
}
const clickModalForm = () => {
  $modalStore.ShowModal(0);
}

const incrementTicket = (boletoId: number) => {

  listticket.forEach((item) => {
    if (item.id == boletoId) {
      item.cantidad++;
    }
  })
}

const decrementTicket = (boletoId: number) => {


  listticket.forEach((item) => {
    if (item.id == boletoId) {
      item.cantidad--;
    }
  })
}

const formatMonto = (monto: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(monto);
};

const getListSelected = computed(() => {

  return listticket.filter(item => item.selected && item.cantidad > 0)
    .map(seccion => seccion);

});

const calculaMonto = (listTicketSelected: IVentaBoletoDetalle[]) => {

  if (listTicketSelected.length == 0)
    montoTotal.total = 0;

  let total = ref(0);
  listTicketSelected.forEach((ticket) => {
    total.value += (ticket.cantidad * ticket.precio)

  })
  montoTotal.total = total.value;


}
watch(
  () => getListSelected.value,
  (newVal) => {
    if (newVal) {

      calculaMonto(newVal);
    }
    else
      calculaMonto([]);

  }
);

</script>
<style  lang="scss">
.item-add-minus {
  display: flex;
  width: 125px
}

.item-border {
  border: 1px solid #bdbdbd;
  border-radius: 8px;
}

.ticket-footer {
  width: 100%;
  left: 0;
  background-color: #E8EFF3 !important;
  bottom: 0;
  z-index: 999;
  position: fixed;

}

ul {
  padding: 0;
  margin: 0;
}


.ticket-view-total {
  padding-top: 15px;
  border-top: 2px dashed red;
}

.ticket-view-total .spacing {
  padding-top: 15px;
  padding-bottom: 15px;
}

.ticket-view-total ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 0;
}

.ticket-view-margin {
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 30px;
}

.footer-btn {
  padding-bottom: 15px;
}

.my-menu-link {
  color: white;
  background: #5870C0;
  border-radius: 10px;
}



.q-item--active .text-caption {
  color: #fff;
}

.q-item--active .q-item__label {
  color: #fff !important;
}


.q-item--active .q-item__section .item-add-minus .q-btn {
  color: #fff;
  background-color: #fff;
}

.q-item--active .q-item__section .item-add-minus .q-field {
  color: #fff;
  background-color: #fff;
  border-radius: 10px;
}

.item-add-minus .q-field__native {

  text-align: center;
  font-size: 15px;
}
</style>
