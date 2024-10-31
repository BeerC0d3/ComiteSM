import { boot } from 'quasar/wrappers';
let routerInstance: any = null;

export default boot(({ router }) => {
  routerInstance = router;
  console.log(routerInstance);
});

export { routerInstance };
