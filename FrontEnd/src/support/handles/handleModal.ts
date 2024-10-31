import { ref } from 'vue';
import { IModaleMessage } from 'src/app/Models/Sistema/IModel';

const modal = ref<IModaleMessage>({
  typeMessageClave: '',
  title: '',
  message: '',
  Show: false,
});

const Show = (typeMessageClave: string, title: string, message: string) => {
  modal.value.typeMessageClave = typeMessageClave;
  modal.value.title = title;
  modal.value.message = message;
  modal.value.Show = true;
};
const Hide = () => {
  modal.value.Show = false;
};
const GetModal = () => {
  return modal;
};
export default () => ({
  Show,
  Hide,
  GetModal,
});
