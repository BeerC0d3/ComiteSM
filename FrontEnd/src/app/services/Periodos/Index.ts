import { api } from 'boot/axios';
import { IPeriodo, IPeriodoProperty } from 'src/app/Models/Periodos/IModel';

export class Periodo {
  constructor() {
    console.log('accesando class Periodo');
  }

  async Get(): Promise<IPeriodo[]> {
    const { data } = await api.get('/api/Periodos/GetPeriodos');
    return data;
  }

  async AddUpdateService(periodoModel: IPeriodoProperty) {
    await api
      .post('/api/Periodos/AddUpdatePeriodo/', periodoModel)
      .then(async (response) => {
        console.log(response);
      });
  }
}
