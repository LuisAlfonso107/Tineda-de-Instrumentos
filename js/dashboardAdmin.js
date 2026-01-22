import { dashboardAdminTemplate } from "../components/dashboardAdmin.template.js";
import { productsController } from "./products.js"
import { config } from "./config.js"

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

    //renderizar productos
    await this.renderProducts()
    
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
  },

  async renderProducts(){
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
        this.addListeners()
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

  async deleteProduct(id, e){
    e.preventDefault()
    const product = {
      id: id
    }
    const response = await productsController.deleteProduct(product)
    if(response.status){
      this.renderProducts()
      alert("producto eliminado")
    }
    else{
      alert(response.msg)
    }

  },

  drawModalUpdatedProduct(id){
    const thisArg = this
  // Insertar el modal
    const product = productsController.getById(id)    
    const modalHTML = dashboardAdminTemplate.updateProduct(product.data[0]);
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modal = document.querySelector("#updateProductModal");
    const cancelBtn = document.querySelector("#cancelUpdateProduct");
    const saveBtn = document.querySelector("#saveUpdateProduct");
    const form = document.querySelector("#updateProductForm");

    if (modal) {
      modal.classList.add("show");  // Mostrar el modal con animación
    }

    // Cerrar modal
    cancelBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);  // Esperar la transición
    });

    // llamar la funcion de guardar producto
    form.addEventListener("submit", function(event){
      event.preventDefault();
      thisArg.updateProduct(id, product);      
    });

  },

  updateProduct(id, productObj){
          
    const product = {
      id: id,
      nombre: document.querySelector("#updateProductName").value,
      precio: Number(document.querySelector("#updateProductPrice").value),
      stock: Number(document.querySelector("#updateProductStock").value),
      categoria: document.querySelector("#updateProductCategory").value,
      descripcion: document.querySelector("#updateProductDescription").value,
      descuento: Number(productObj.data[0].descuento),
      IVA: Number(productObj.data[0].IVA),
      status: productObj.data[0].status,
      caracteristicas: productObj.data[0].caracteristicas,
      imagenes: [
        productObj.data[0].imagenes[0]
      ]
    }

    /* const response = productsController.updateProduct(product)
    if(response.status){
      this.renderProducts()
      alert("producto actualizado")
      console.log("producto actalizado");
    }
    else{
      alert(response.msg)
    } */
   productsController.updateProduct(product).then(response => {
      console.log(response);
      if(response.status){
        this.renderProducts()
      }
      else{
        alert(response.msg)
      }
   })
  },

  addListeners(){
      const thisArg = this
      const btnsDeletedProducts = document.querySelectorAll(".productDeleteBtn")
      if (btnsDeletedProducts) {
          btnsDeletedProducts.forEach(function(value, index){
              const bntElement = value
              let id = value.dataset.id
              bntElement.addEventListener("click", async function(e){
                  e.preventDefault()
                  await thisArg.deleteProduct(id, e)
                  return
              })                
          })                        
      } else {
          console.log(`no se encontraron los botones de eliminar producto`);                        
      }
      const btnsUpdateProducts = document.querySelectorAll(".productUpdateBtn")
      if (btnsUpdateProducts) {
          btnsUpdateProducts.forEach(function(value, index){
              const bntElement = value
              let id = value.dataset.id
              bntElement.addEventListener("click", function(e){
                  e.preventDefault()
                  thisArg.drawModalUpdatedProduct(id, e)
              })                
          })                        
      } else {
          console.log(`no se encontraron los botones de editar producto`);                        
      }
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
    const imagenes = ["img/productDefault.jpg"];

   const formData = {
    nombre: nombre,
    precio: precio,
    stock:stock,
    categoria: categoria,
    imagenes: [imagenes],
    caracteristicas: {
      material: "default"
    },
    descuento: 0,
    IVA: 21,
    status:"available",
    descripcion: "default",

   }

    try {
      //console.log("Enviando fetch a", "http://localhost:9000/products");
      const response = await fetch(`${config.endPoints().products}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      //console.log("Respuesta:", response.status);
      if (!response.ok) throw new Error("Error al crear producto");

      //alert("Producto agregado correctamente");
      modal.classList.remove("show");
      setTimeout(() => modal.remove(), 300);

    } catch (error) {
      //console.error("Error en fetch:", error);
      alert("Error al agregar producto");
    }
  });
}

if (addProductBtn) {
  //console.log("Botón add-product-btn encontrado, asignando event listener");
  addProductBtn.addEventListener("click", setupModal);
} /* else {
  console.log("Botón add-product-btn no encontrado");
} */

if (btnAddProduct) {
  //console.log("Botón btn-add-product encontrado, asignando event listener");
  btnAddProduct.addEventListener("click", setupModal);
} /* else {
  console.log("Botón btn-add-product no encontrado");
} */
