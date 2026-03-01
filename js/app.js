import { DB } from "./db.js";
import { Dashboard } from "./dashboard.js";
import { Sync } from "./sync.js";

window.App = {
  async init() {
    await DB.init();
    Dashboard.render();
    Sync.start();
  },

  show(module) {
    import(`./${module}.js`)
      .then(m => m.default.render())
      .catch(() => Dashboard.render());
  }
};

window.addEventListener("load", App.init);
