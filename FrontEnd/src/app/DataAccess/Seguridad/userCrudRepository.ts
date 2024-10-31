import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'userCrudAccess',
  setup: () => {
    const text = ref('');
    const formUsuario = ref<any>(null);

    const onValidation = async (evt: any) => {
      //console.log('form');
      formUsuario.value.validate().then(async (success: any) => {
        if (success) {
          //console.log(periodoObject.value);
          try {
            console.log('exelente form usuario');
          } catch (e) {
            //$commonStore.Remove_Request();
            //HandlError(e);
          }
        }
      });
    };
  },
});
