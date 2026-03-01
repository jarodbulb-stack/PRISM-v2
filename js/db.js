export const DB = {
  db: null,

  async init() {
    return new Promise(resolve => {
      const req = indexedDB.open("PRISMv2", 1);

      req.onupgradeneeded = e => {
        const db = e.target.result;
        db.createObjectStore("records", { keyPath: "id", autoIncrement: true });
      };

      req.onsuccess = e => {
        DB.db = e.target.result;
        resolve();
      };
    });
  },

  add(record) {
    const tx = DB.db.transaction("records", "readwrite");
    tx.objectStore("records").add(record);
  },

  async getAll() {
    return new Promise(resolve => {
      const tx = DB.db.transaction("records");
      const req = tx.objectStore("records").getAll();
      req.onsuccess = () => resolve(req.result);
    });
  }
};
