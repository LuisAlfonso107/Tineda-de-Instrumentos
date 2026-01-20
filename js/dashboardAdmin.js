import { dashboardAdminTemplate } from "../components/dashboardAdmin.template.js";

export const dashboardAdmin = {
  container: document.getElementById("dashBoardAdmin"),

  init() {
   
    if (!this.container) return;

    const users = JSON.parse(localStorage.getItem("currentUser"));

    if (!users || !users.isActive || users.role !== "admin") {
      window.location.href = "../index.html"; 
      return;
    }

    // Renderizar
    this.container.innerHTML = dashboardAdminTemplate.init();

    // Saludo para el admin
    const saludo = document.getElementById("user");
    if (saludo) {
      saludo.innerText = `Bienvenido ${users.name} 🎵`;
    }
  }
};

// Ejecutamos la inicialización
dashboardAdmin.init();


// FUNCION #2: Cerrar sesión 


//BOTON PARA CERRAR SESIÓN"
const cerrarSesion = document.querySelector("#cerrar-link");


cerrarSesion.addEventListener("click", () => {

  const modalHTML = dashboardAdminTemplate.confirmLogout();
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = document.querySelector(".modal");
  modal.style.display = "flex";

  // Ahora que el modal existe, seleccionar los botones y añadir listeners
  const confirmacion = document.getElementById("confirm-logout");
  const cancelar = document.getElementById("cancel-logout");

  confirmacion.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      currentUser.isActive = false;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    window.location.href = "../index.html"; 
  });

  cancelar.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    if (modal) {
      document.body.removeChild(modal);
    }
  });
});


/*MODAL DE AGREGAR PRODUCTO */

const addProductBtn = document.getElementById("add-product-btn");
const btnAddProduct = document.getElementById("btn-add-product");

function setupModal() {
  console.log("Configurando modal");
  // Insertamos el modal
  const modalHTML = dashboardAdminTemplate.crearNuevoProducto();
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.querySelector(".product-modal");
  const form = document.getElementById("product-form");
  const cancelBtn = document.getElementById("cancel-product");

  if (modal) {
    console.log("Modal insertado");
    modal.classList.add("show");  // Mostrar el modal con animación
  }
  if (form) console.log("Form encontrado");
  if (cancelBtn) console.log("Botón cancelar encontrado");

  // Cerrar modal
  cancelBtn.addEventListener("click", () => {
    console.log("Cerrando modal");
    modal.classList.remove("show");
    setTimeout(() => modal.remove(), 300);  // Esperar la transición
  });

  // Enviar producto al servidor
  form.addEventListener("submit", async (e) => {
    console.log("Form submit");
    e.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").value;

    console.log("Datos:", { name, price, stock, category, image });

    const product = {
      nombre: name,
      categoria: category,
      precio: parseFloat(price),
      descuento: 0,
      IVA: 21,
      stock: parseInt(stock),
      status: 'available',
      descripcion: 'Descripción por defecto',
      caracteristicas: {},
      imagenes: [image]
    };

    try {
      console.log("Enviando fetch a", "http://localhost:3000/products");
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      console.log("Respuesta:", response.status);
      if (!response.ok) throw new Error("Error al crear producto");

      alert("✅ Producto agregado correctamente");
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);

    } catch (error) {
      console.error("Error en fetch:", error);
      alert("❌ Error al agregar producto");
    }
  });
}

if (addProductBtn) {
  console.log("Botón add-product-btn encontrado, asignando event listener");
  addProductBtn.addEventListener("click", setupModal);
} else {
  console.log("Botón add-product-btn no encontrado");
}

if (btnAddProduct) {
  console.log("Botón btn-add-product encontrado, asignando event listener");
  btnAddProduct.addEventListener("click", setupModal);
} else {
  console.log("Botón btn-add-product no encontrado");
}

 
  
