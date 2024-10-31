export default [
  {
    path: '/app',
    component: () => import('../layouts/AppLayout.vue'),
    meta: { requireLogin: true },
    children: [
      { path: '', redirect: '/app/Home' },
      {
        path: 'Home',
        component: () => import('../pages/Home.vue'),
        //meta: { requireLogin: true },
      },
      {
        path: 'Periodos',
        children: [
          // { path: '', redirect: '/List' },
          {
            // name: 'List',
            path: '',
            component: () => import('../pages/Periodos/ListPeriodo.vue'),
            //meta: { requireLogin: true },
          },
          {
            path: 'add-edit',
            component: () => import('../pages/Periodos/AddEdit.vue'),
            //meta: { requireLogin: true },
          },
        ],
      },
      {
        path: 'Usuarios',
        children: [
          // { path: '', redirect: '/List' },
          {
            // name: 'List',
            path: '',
            component: () => import('../pages/Seguridad/ListUsuario.vue'),
            //meta: { requireLogin: true },
          },
          {
            path: 'add-edit',
            component: () => import('../pages/Seguridad/AddEdit.vue'),
            //meta: { requireLogin: true },
          },
        ],
      },
      {
        path: 'Secciones',
        children: [
          {
            path: '',
            component: () => import('../pages/Secciones/ListSeccion.vue'),
            //meta: { requireLogin: true },
          },
        ],
      },
      {
        path: 'MiGente',
        children: [
          {
            path: '',
            component: () => import('../pages/MiGente/ListPersona.vue'),
            //meta: { requireLogin: true },
          },
          // {
          //   path: 'persona-map',
          //   component: () => import('../pages/MiGente/PersonaMap.vue'),
          //   //meta: { requireLogin: true },
          // },
        ],
      },
      {
        path: 'Ingresos',
        //  { path: '', redirect: '/app/Home' },
        children: [
          {
            name: 'Cooperacion',
            path: 'Cooperacion',
            component: () => import('../pages/Ingresos/Cooperacion.vue'),
          },
          {
            name: 'MiCooperacion',
            path: 'MiCooperacion',
            component: () => import('../pages/Ingresos/MiCooperacion.vue'),
          },
        ],
      },
      {
        path: 'Ventas',
        children: [
          {
            path: 'BoletoAutobus',
            children: [
              {
                name: 'VentaBoletosBus',
                path: '',
                component: () =>
                  import('../pages/Ventas/BoletoAutobus/ListBoleto.vue'),
              },
              {
                name: 'AddEdit',
                path: 'AddEdit',
                component: () =>
                  import('../pages/Ventas/BoletoAutobus/AddEdit.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'Test',
        children: [
          {
            path: '',
            component: () => import('../pages/Test.vue'),
          },
        ],
      },

      // {
      //   path: 'Medicos',
      //   // component: () => import('../pages/MedicoPage.vue'),
      //   // meta: { requireLogin: true },
      //   children: [
      //     { path: '', component: () => import('../pages/Medicos/Listado.vue') },

      //     {
      //       path: 'add-edit',
      //       component: () => import('../pages/Medicos/AddEdit.vue'),
      //       meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'Catalogos',
      //   component: () => import('../pages/CatalogoPage.vue'),
      //   meta: { requireLogin: false },
      //   children: [
      //     { path: '', component: () => import('../pages/Sistema/Listado.vue') },

      //   ],
      // },
      // {
      //   path: 'Pacientes',
      //   component: () => import('../pages/PacientePage.vue'),
      //   meta: { requireLogin: true },
      //   children: [
      //     // { path: '', component: () => import('../pages/Medicos/Listado.vue') },

      //     {
      //       path: 'autorizar-paciente',
      //       component: () => import('../pages/Pacientes/PacienteDetalle.vue'),
      //       meta: { requireLogin: true },
      //     },
      //   ],
      // },
      // {
      //   path: 'profile',
      //   component: () => import('../../auth/pages/Profile.vue'),
      //   meta: { requireLogin: true },
      // },
      // {
      //   path: 'Component',
      //   component: () => import('../pages/TestComponent.vue'),
      // },
      // {
      //   path: 'Camara',
      //   component: () => import('../pages/Camara.vue'),
      // },
    ],
  },
];
