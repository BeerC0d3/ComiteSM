import { useRoute } from 'vue-router';
const $route = useRoute();

export const setHeaderAmount = () => {
  console.log($route);
  const div = document.getElementById('header-master') as HTMLElement;
  if ($route.name == 'Cooperacion') {
    if (div.classList.contains('app-header')) {
      div.classList.add('app-header');
    }
  } else {
    if (div.classList.contains('app-header'))
      div.classList.remove('app-header');
  }
};
