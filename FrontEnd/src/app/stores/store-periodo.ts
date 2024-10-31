import { defineStore } from 'pinia';
import { IPeriodoSelected } from '../Models/Periodos/IModel';
import * as storage from 'src/auth/storage';

export const usePeriodoSelected = defineStore('periodo', {
  state: (): IPeriodoSelected => ({
    poId: 0,
    claveEstatus: 'CERRADO',
  }),
  getters: {
    getPoId: (state) => state.poId,
    getClaveEstatus: (state) => state.claveEstatus,
  },
  actions: {
    setPeriodoSelected(poId: number, claveEstatus: string) {
      storage.setHeaderPeriodo(poId);
      this.poId = poId;
      this.claveEstatus = claveEstatus;
    },

    setTest() {
      console.log('function Test()');
    },
  },
  //persist: true,
});
