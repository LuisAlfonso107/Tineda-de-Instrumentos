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

const cerrarSesion = document.querySelector("#cerrar button");
const mostrar = document.getElementById("modal");

cerrarSesion.addEventListener("click", () => {
  mostrar.style.display = "block";
});


const confirmacion = document.getElementById("confirm-logout");
const cancelar = document.getElementById("cancel-logout");

if (confirmacion) {
  confirmacion.addEventListener("click", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
      currentUser.isActive = false;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    window.location.href = "../index.html"; 
  });
}

if (cancelar) {
  cancelar.addEventListener("click", () => {
    const modal = document.querySelector(".modal");
    if (modal) {
      document.body.removeChild(modal);
    }
  });
}

































/* if (botonCerrarSesion) {
  botonCerrarSesion.addEventListener("click", () => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usuarioActivo = users.find(user => user.isActive === true);

    if (usuarioActivo) {
     
      usuarioActivo.isActive = false;

      localStorage.setItem("users", JSON.stringify(users));
    }
    window.location.href = "../index.html"; 
  });
} 
dashboardAdmin.init();
 */
