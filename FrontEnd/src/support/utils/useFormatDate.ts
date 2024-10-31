import { date } from 'quasar';

export default function useGetDateFormat() {
  const timeStamp = Date.now();
  return date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss');
}
