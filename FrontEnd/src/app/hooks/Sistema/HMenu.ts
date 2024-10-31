import { ref } from 'vue';
import { Menu } from '../../services/Sistema/SMenu';
import { IMenu } from '../../Models/Sistema/IModel';

const MenuService = new Menu();
const menus = ref<IMenu[]>([]);

const getAll = async () => {
  const tmpMenus = await MenuService.Get();
  // console.log(tmpMenus);
  menus.value = [...tmpMenus];

  return tmpMenus;
};

export default () => ({
  getAll,
  menus,
});
