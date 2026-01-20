import { dashboardAdminTemplate } from "../components/dashboardAdmin.template.js";
import { productsController } from "./products.js"

export const dashboardAdmin = {
  container: document.getElementById("dashBoardAdmin"),

  async init() {
   
    if (!this.container) return;

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user || !user.isActive || user.role !== "admin") {
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

    /* ver los productos */
    const productsOut = document.querySelector("#productsOut")
    const products = await this.getProducts()
    if(products.status){
      let productsHtml = "";
      products.data.forEach(product => {
        productsHtml +=  dashboardAdminTemplate.productCard(product)
      });

      if(productsOut){
        productsOut.innerHTML = productsHtml
      }
      else{
        console.log("no se encontro el div para dibujar los productos")
      }

    }
    else{
      if(productsOut){
        productsOut.innerHTML = dashboardAdminTemplate.productNoData()
      }
      else{
        console.log("no se encontro el div para dibujar los productos")
      }
    }
  },

  async getProducts(){
    const result ={}
    await productsController.getData()
    const products = productsController.data
    if (products.length > 0){
      result.status = true
      result.msg = "hay productos"
      result.data = products
    }
    else{
      result.status = false
      result.msg = "No hay productos para mostrar"
    }
    return result
  }

};

// Ejecutamos la inicialización
dashboardAdmin.init();




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

  // Insertar el modal
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

  // Modificación: Cambié a FormData para enviar imagen junto con datos al servidor
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submit");

    const nombre = document.getElementById("name").value;
    const precio = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const categoria = document.getElementById("category").value;
    const imagenes = document.getElementById("image").files[0];

    //falta guardar la imagen en la carpeta del proyecto, y luego enviar esa ruta de la imagen en el form data

    //console.log("Datos:", { nombre, precio, stock, categoria, imagenes });

    /* const formData = new );
    formData.append('precio', pFormData();
    formData.append('nombre', nombrerecio);
    formData.append('stock', stock);
    formData.append('categoria', categoria);
    if (imagenes) {
      formData.append('imagenes', imagenes);
    } */
   const formData = {
    nombre: nombre,
    precio: precio,
    stock:stock,
    categoria: categoria,
    imagenes: [imagenes]
   }

    try {
      console.log("Enviando fetch a", "http://localhost:9000/products");
      const response = await fetch("http://localhost:9000/products", {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log("Respuesta:", response.status);
      if (!response.ok) throw new Error("Error al crear producto");

      alert("Producto agregado correctamente");
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);

    } catch (error) {
      console.error("Error en fetch:", error);
      alert("Error al agregar producto");
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