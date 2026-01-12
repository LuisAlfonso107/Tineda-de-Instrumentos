// main.js
import { header } from "./header.js";
import { navbar } from "./navbar.js";
import { footer } from "./footer.js";
import { cart } from "../components/cart/cart.js";
import { productsController } from "./products.js";
import { registro } from "./registro.js";
import { usuarioCreado } from "./usuarioCreado.js";
import { login } from "./login.js";
import { productoDetalleController } from "./productoDetalle.js";
import { hero } from "./hero.js"
 
// 1. Cargar datos de productos (con await dentro de async)
await productsController.getData();

// 2. Renderizar componentes estáticos
header.init();
navbar.render();
footer.render();
hero.render()
footer.render()
productsController.render();

/* no borrar: cart.init() funcion para inicializar el estado del carrito */
cart.init();
/* no borrar lo de arriba no borrar cart.init() */

// 4. Evento para abrir/cerrar el carrito
/* no borrar esto: evento para abrir y cerrar el carrito */
const btnCart = document.querySelector(`#${cart.idBtnCart}`)
if (btnCart) {
    btnCart.addEventListener("click", function(e){
        e.preventDefault()
        cart.toggle()
    })   
}
else {
  console.log("Botón del carrito no encontrado. ¿Está cart.idBtnCart correctamente definido?");
}
/* fin de evento para llamar al carrito: no borrar */

// 7. Formularios específicos
const registroSection = document.querySelector("#registro-section");
if (registroSection) registro.f();

const usuarioSection = document.querySelector("#usuario");
if (usuarioSection) usuarioCreado.f();

// 8. Login
login.loginF();

/*(function enableCategoryNav(){
  // Scroll suave al hacer clic en el navbar
  const navbar = document.getElementById("navbar");
  if (navbar) {
    navbar.addEventListener("click", (e) => {
      const link = e.target.closest("a[href^='#']");
      if (!link) return;
      const targetId = link.getAttribute("href").slice(1); // sin '#'
      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${targetId}`);
      }
      // Si aún no existe (por cualquier razón), dejamos que el navegador gestione el hash.
      // Cuando la sección aparezca, el bloque de hashchange se ocupará.
    });
  }

  // Si la URL ya trae un hash (o el usuario clicó antes de que se renderice),
  // navegamos cuando el DOM tenga la sección.
  const navigateToHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intento inmediato por si ya está renderizado:
  navigateToHash();

  // Reintento tras el render del catálogo (por si se llamó después):
  // Este setTimeout es no invasivo y evita dependencias internas.
  setTimeout(navigateToHash, 0);

  // Además, reaccionamos a cambios de hash (navegación manual del usuario):
  window.addEventListener("hashchange", navigateToHash);
})();*/

  // Si la URL ya trae un hash (o el usuario clicó antes de que se renderice),
  // navegamos cuando el DOM tenga la sección.
  const navigateToHash = () => {
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intento inmediato por si ya está renderizado:
  navigateToHash();

  // Reintento tras el render del catálogo (por si se llamó después):
  // Este setTimeout es no invasivo y evita dependencias internas.
  setTimeout(navigateToHash, 0);

  // Además, reaccionamos a cambios de hash (navegación manual del usuario):
  window.addEventListener("hashchange", navigateToHash);

/* De manera atenta se les notifica la importancia de la presente; no alteren la naturaleza del codigo que parte desde la linea posterior a este comentario
dicha modificacion significaria la interrupcion de la sincronia y repercutiria como desencadenante de posiles fallos en el desarrollo del proyecto  
(funcion de la barra del header) */
const input = document.getElementById("buscador-input");
if (!input) {
  console.error("No se encontró el input del buscador");
  /* return; */
}
input.addEventListener("keyup", async () => {
    const texto = input.value.trim();
    if (texto === "") {
        document.getElementById("search-results").innerHTML = "";
        return;
    }
    const resultados = await header.buscarInstrumentos(texto);
    header.mostrarResultados(resultados);
});
// Fin de la funcion de la barra del buscador en el header.

const inpt = document.querySelector("#registro-section");
if (inpt) {
  registro.f()
}

/* // pdetalle
productoDetalleController.renderProductDetail()
// fin de pdetalle */

/*Login */
 login.loginF()
/*Seguimiento no borrar */
