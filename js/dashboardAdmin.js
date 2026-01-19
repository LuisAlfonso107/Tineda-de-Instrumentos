import { dashboardAdminTemplate } from "../components/dashboardAdmin.template.js";

export const dashboardAdmin = {
  container: document.getElementById("dashBoardAdmin"),

  init() {
   
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
