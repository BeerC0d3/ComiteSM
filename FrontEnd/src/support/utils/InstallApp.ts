import { ref, computed } from 'vue';

// const deferredPrompt = ref<any>(null);

export const browserType = () => {
  const userAgent = navigator.userAgent;
  let browserName;
  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }

  return browserName;
};

export const installApp = async (deferredPrompt: any) => {
  console.log(deferredPrompt);
  deferredPrompt.value.prompt();
  const { outcome } = await deferredPrompt.value.userChoice;

  if (outcome === 'dismissed') {
    console.log(`User response to the install prompt: ${outcome}`);
    deferredPrompt.value = null;
    return '';
  }
};

export const pwaIsInstalled = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('This IS running as standalone.');
    return true;
  }

  console.log('This is NOT running as standalone.');
  return false;
};
