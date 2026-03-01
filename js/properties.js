import { DB } from "./db.js";

const Properties = {

  async render() {
    const orgId = localStorage.getItem("orgId") || "demo-org";

    const data = await DB.getAll();
    const properties = data.filter(r =>
      r.type === "property" && r.orgId === orgId
    );

    document.getElementById("view").innerHTML = `
      <h2>Properties</h2>

      <button id="addProperty">Add Property</button>

      <div id="propertyList">
        ${properties.map(p => `
          <div class="card">
            <h3>${p.name}</h3>
            <p>Tenant: ${p.tenant || "Vacant"}</p>
            <p>Rent: ₱${p.rent}</p>
          </div>
        `).join("")}
      </div>
    `;

    document.getElementById("addProperty").onclick =
      () => this.showAddForm();
  },

  showAddForm() {
    document.getElementById("view").innerHTML = `
      <h2>Add Property</h2>

      <input id="name" placeholder="Property Name" />
      <input id="tenant" placeholder="Tenant Name" />
      <input id="rent" placeholder="Monthly Rent" type="number" />

      <button id="save">Save</button>
      <button onclick="App.show('properties')">Cancel</button>
    `;

    document.getElementById("save").onclick = async () => {
      const orgId = localStorage.getItem("orgId") || "demo-org";

      DB.add({
        type: "property",
        orgId,
        name: document.getElementById("name").value,
        tenant: document.getElementById("tenant").value,
        rent: Number(document.getElementById("rent").value),
        createdAt: Date.now()
      });

      App.show("properties");
    };
  }
};

export default Properties;
