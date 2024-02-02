const setInstallDate = () => {
  const installDate = localStorage.getItem('installDate');

  if (!installDate) {
    localStorage.setItem('installDate', new Date().toISOString());
  }
};

const getInstallDate = () => {
  return localStorage.getItem('installDate');
};

const displayInstallDate = () => {
  const strong = document.querySelector('p strong');

  const installDateISO = getInstallDate();

  if (installDateISO) {
    const installDate = new Date(installDateISO);
    const currentDate = new Date();

    const diffTime = Math.abs(installDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    strong.textContent = diffDays;
  } else {
    strong.textContent = 0;
  }
};

const handleInstallDate = () => {
  setInstallDate();
  displayInstallDate();
};

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register(`/pwa-gallery/sw.js`);

      console.log('Service worker registered');
    } catch (error) {
      console.error(error);
    }
  }
};

window.addEventListener('load', async () => {
  await registerServiceWorker();

  handleInstallDate();
});
