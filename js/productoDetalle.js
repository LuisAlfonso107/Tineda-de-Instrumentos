import { productsController } from "./products.js"; // deonde estan lo productos 
import { detalleTemplate } from "../components/paginaDetalle.template.js"; // el que los pinta 
import { cart } from "../components/cart/cart.js"; // y donde guardamos lo que compramos 

export const productoDetalleController = {
  container: document.getElementById("product-detail"),

  init() {
    // ¿Existe el puerto? 
    if (!this.container) {
      return; // 
    }

    // Si los datos no están cargados, se cargan, este trae todos lo produtos 
    if (productsController.data.length === 0) {
      productsController.getData().then(() => this.render());
    } else {
      this.render(); // Se ejecuta SOLO cuando getData() termine 
    }
  },

  traerProductoURL() {
    const params = new URLSearchParams(window.location.search); // Lee URL
    const id = params.get("id");  
    return id ? Number(id) : null;   
  },

 render() {
    const id = this.traerProductoURL();
    if (!id) return;
    
    const product = productsController.data.find(p => p.id === id);

    console.log(product);
    
    
    this.container.innerHTML = detalleTemplate.init(product);
    this.agregarCarrito(id);
},

   agregarCarrito(productId) {
    const button = this.container.querySelector(".btn-add");
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        cart.addItem(productId);
        button.textContent = "¡Añadido!";
        button.disabled = true;
        setTimeout(() => {
          button.textContent = "Añadir al carrito";
          button.disabled = false;
        }, 1000);
      });
    }
  },


};

// Esto inicia la pagina de detalle solo en esta  página 
document.addEventListener("DOMContentLoaded", () => {
  productoDetalleController.init();
});