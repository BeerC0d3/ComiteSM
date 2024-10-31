import { reactive } from 'vue';

const stateNav = reactive({
  navItems: [
    {
      name: 'Home',
      root: '/home',
      to: '/app/Home',
      icon: 'fa-solid fa-house',
      label: 'Inicio',
    },
    {
      name: 'Periodos',
      root: '/Periodos',
      to: '/app/Periodos',
      icon: 'fa-solid fa-sack-dollar',
      label: 'Periodos',
    },
    {
      name: 'MiSecciones',
      root: '/Secciones',
      to: '/app/Secciones',
      icon: 'fa-solid fa-location-dot',
      label: 'Mis secciones',
    },
    {
      name: 'MiGente',
      root: '/MiGente',
      to: '/app/MiGente',
      icon: 'fa-solid fa-users',
      label: 'Mi gente',
    },
    // {
    //   root: '/Settings',
    //   to: '/Settings',
    //   icon: 'fa-solid fa-gear',
    //   label: 'Configuración',
    // },
    // {
    //   root: '/Profile',
    //   to: '/Profile',
    //   icon: 'account_circle',
    //   label: 'Perfil',
    // },
    // {
    //   root: '/Profile',
    //   to: '/Profile',
    //   icon: 'fa-solid fa-right-from-bracket',
    //   label: 'Perfil',
    // },
  ],
});

const storeNav = {
  stateNav,
};

export default storeNav;
