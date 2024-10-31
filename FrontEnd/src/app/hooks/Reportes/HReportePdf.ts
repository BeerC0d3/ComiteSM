import { ReportePdf } from 'src/app/services/Reportes/SReportePdf';

const reportePdfService = new ReportePdf();

const ReporteCooperacionIntegrante = async () => {
  await reportePdfService.ReporteCooperacionIntegrante();
};
export default () => ({
  ReporteCooperacionIntegrante,
});
