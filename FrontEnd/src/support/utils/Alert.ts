import { Dialog } from 'quasar';

export const alertSuccess = (title: string, message: string) => {
  Dialog.create({
    title: title,
    message: message,
    html: true,
  })
    .onOk(() => {
      // console.log('OK')
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

export const alertError = () => {
  console.log('error');
};
