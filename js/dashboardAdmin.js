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




/* 



// FUNCION #2: Cerrar sesión 

const botonCerrarSesion = document.getElementById("cerrar");

if (botonCerrarSesion) {
  botonCerrarSesion.addEventListener("click", () => {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const usuarioActivo = users.find(user => user.isActive === true);

    if (usuarioActivo) {
     
      usuarioActivo.isActive = false;

      localStorage.setItem("users", JSON.stringify(users));
    }
    window.location.href = "../index.html"; 
  });
} */
dashboardAdmin.init();

