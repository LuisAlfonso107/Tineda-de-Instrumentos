import { dashboardClienteTemplate } from '../components/dashboardCliente.template.js';

export const dashboardCliente = {
  container: document.getElementById("dashboardCliente-main"),

  init() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioActivo = users.find(user => user.isActive === true);

    // lo mando a admin 
    if (usuarioActivo?.isActive === true && usuarioActivo.role === "admin") {
      window.location.href = "../pages/dashBoardAdmin.html";
      return;
    }

    // lo mando a cliente
    if (usuarioActivo?.isActive === true && usuarioActivo.role === "client") {

      const saludo = document.getElementById("user");
      if (saludo) {
        saludo.innerText = `Hola, ${usuarioActivo.name} 🎵`;
      }

      // Rrenderiso
      if (this.container) {
        this.container.innerHTML = dashboardClienteTemplate.init();
      }

      return;
    }

    // si no esta activo ni logeado 
    window.location.href = "../index.html";
    return;
  }
};

// 
/*
const botonCerrarSesion = document.getElementById("logout");
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
}
*/

// ¡Importante! Normalmente se llama así:
dashboardCliente.init();