import { api } from 'boot/axios';
import { uid } from 'quasar';

export class ReportePdf {
  public constructor() {
    console.log('service reporte');
  }

  async ReporteCooperacionIntegrante() {
    await api
      .get('/api/Reportes/ReporteCooperacionIntegrante', {
        responseType: 'blob',
      })
      .then(async (response) => {
        const guid = uid();
        console.log(guid);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', guid + '.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
  }
}
