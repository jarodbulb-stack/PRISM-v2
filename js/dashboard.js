import { DB } from "./db.js";

export const Dashboard = {
  async render() {
    const data = await DB.getAll();
    document.getElementById("view").innerHTML = `
      <h2>Dashboard</h2>
      <p>Total records: ${data.length}</p>
      <button id="addSample">Add Sample Record</button>
    `;

    document.getElementById("addSample").onclick = () => {
      DB.add({ name: "Sample", createdAt: Date.now() });
      Dashboard.render();
    };
  }
};

export default Dashboard;
