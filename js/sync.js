export const Sync = {
  start() {
    setInterval(() => {
      const status = document.getElementById("syncStatus");
      if (navigator.onLine) {
        status.textContent = "Online — Syncing";
        // Future cloud sync logic placeholder
      } else {
        status.textContent = "Offline";
      }
    }, 5000);
  }
};
