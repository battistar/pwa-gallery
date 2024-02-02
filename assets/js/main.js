async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register(`/pwa-gallery/sw.js`);

      console.log('Service worker registered');
    } catch (error) {
      console.error(error);
    }
  }
}

window.addEventListener('load', async () => {
  await registerServiceWorker();
});
