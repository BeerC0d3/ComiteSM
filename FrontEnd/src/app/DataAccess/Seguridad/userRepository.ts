import {
  defineComponent,
  ref,
  onBeforeMount,
  computed,
  watch,
  inject,
} from 'vue';
import { date } from 'quasar';
import useHookUsuario from '../../../auth/hooks/Seguridad/HUsuario';
import useGetDateFormat from '../../../support/utils/useFormatDate';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'userAccess',
  props: {
    showCheck: {
      type: Boolean,
      default: true,
    },
    showOptions: {
      type: Boolean,
      default: false,
    },
    getUserCheck: {
      type: Function,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  setup: (props) => {
    useQuasar().addressbarColor.set('#C10015');
    const $q = useQuasar();
    const checkUser = ref([]);
    const red = ref(false);
    const bus = inject<any>('bus');
    // $q.addressbarColor.set('#C10015');

    const computedCheck = computed(() => checkUser.value);

    const { GetUsuariosActivos, usuarios } = useHookUsuario();

    onBeforeMount(async () => {
      //await GetUsuariosActivos();
      await loadUsers();
    });

    bus.on('load-users', async () => {
      await loadUsers();
    });

    const loadUsers = async () => {
      await GetUsuariosActivos();
    };

    const getFirstName = (nombre: string) => {
      return nombre.charAt(0);
    };

    // console.log(computedCheck.value);
    if (props.showCheck) {
      watch(
        () => computedCheck.value,
        (newVal) => {
          if (newVal) props.getUserCheck(computedCheck.value);
        }
      );
    }

    return {
      checkUser,
      red,
      usuarios,
      props,
      getFirstName,
    };
  },
});
