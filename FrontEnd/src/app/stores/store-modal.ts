import { defineStore } from 'pinia';

interface modalState {
  show: boolean;
  id: number;
}

export const useModalStore = defineStore('modalForm', {
  state: (): modalState => ({
    show: false,
    id: 0,
  }),
  getters: {
    stateShow: (state) => state.show,
    getId: (state) => state.id,
  },
  actions: {
    ShowModal(Id: number) {
      this.id = Id;
      this.show = true;
    },
    HideModal() {
      this.show = false;
      this.id = 0;
    },
  },
});
