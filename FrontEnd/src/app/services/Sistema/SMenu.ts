import { api } from 'boot/axios';
import { IMenu } from '../../Models/Sistema/IModel';

export class Menu {
  constructor() {
    console.log('accesando Menu');
  }
  async Get(): Promise<IMenu[]> {
    const { data } = await api.get('/api/Menus');

    return data;
  }
}
