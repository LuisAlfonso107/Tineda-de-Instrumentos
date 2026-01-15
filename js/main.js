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
import { dashboardAdmin } from "./dashboardAdmin.js";

// === FUNCIÓN PRINCIPAL ASYNC ===
async function initApp() {
  try {
    // 1. Cargar datos de productos (con await dentro de async)
    await productsController.getData();

    // 2. Renderizar componentes estáticos
    header.init();
    navbar.render();
    footer.render();
    productsController.render();

    // 3. Inicializar el carrito (¡importantísimo!)
    cart.init();

    // 4. Evento para abrir/cerrar el carrito
    const btnCart = document.querySelector(`#${cart.idBtnCart}`);
    if (btnCart) {
      btnCart.addEventListener("click", (e) => {
        e.preventDefault();
        cart.toggle();
      });
    } else {
      console.warn("Botón del carrito no encontrado. ¿Está cart.idBtnCart bien definido?");
    }

    // 5. Scroll suave en navbar
    enableCategoryNav();

    // 6. Buscador en header
    setupSearch();

    // 7. Formularios específicos
    const registroSection = document.querySelector("#registro-section");
    if (registroSection) registro.f();

    const usuarioSection = document.querySelector("#usuario");
    if (usuarioSection) usuarioCreado.f();

    // 8. Login
    login.loginF();

  } catch (error) {
    console.error("Error al inicializar la app:", error);
  }
}

// === SCROLL SUAVE (función separada) ===
function enableCategoryNav() {
  const navbarEl = document.getElementById("navbar");
  if (!navbarEl) return;

  navbarEl.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='#']");
    if (!link) return;

    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
    }
  });

  // Manejo de hash al cargar o cambiar
  const navigateToHash = () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  navigateToHash();
  window.addEventListener("hashchange", navigateToHash);
}

// BUSCADOR 
function setupSearch() {
  const input = document.getElementById("buscador-input");
  if (!input) {
    console.error("No se encontró el input del buscador");
    return;
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
}





function dashadmin() {
    // Detectar las vistas presentes en el DOM
    const isDashboardAdmin = document.getElementById("dashBoardAdmin");


    // Dashboard Admin
    if (isDashboardAdmin) {
        dashboardAdmin.init();
    }   else {
        console.log("No es dashboardAdmin");
    }

  
}

// Llamar a la función para inicializar la vista
dashadmin();




//INICIAR LA APP
initApp();
