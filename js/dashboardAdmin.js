
import { dashboardAdminTemplate } from "../components/dashboardAdmin.template.js";

export const dashboardAdmin = {
  container: document.getElementById("dashBoardAdmin"),

  init() {
    if (!this.container) return;

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.isActive || user.role !== "admin") {
            window.location.href = "../../index.html";
            return;
        }

        this.container.innerHTML = dashboardAdminTemplate.init();

        const saludo = document.getElementById("user");
        if (saludo) saludo.innerText = `Bienvenido ${user.name} 🎵`;
  }
};

dashboardAdmin.init();





















































/* import { dashboardAdminTemplate  } from "../components/dashboardAdmin.template.js"

export const dashboardAdmin = {

  container: document.getElementById("dashBoardAdmin"),

  init() {
    
    this.container.innerHTML = dashboardAdminTemplate .init();




//  FUNCION #1: BUSQUEDA DE USUARIO ACTIVO EN LOCALSTORAGE 
const user = JSON.parse(localStorage.getItem("user")) || [];
const sessionStatus = JSON.parse(localStorage.getItem("sessionStatus")) || true;
const usuarioActivo = user.isActive


if (usuarioActivo && user.role === "admin" && sessionStatus === true) {
    const saludo = document.getElementById("user");
    saludo.innerText = `Bienvenido ${user.name} 🎵`;
  
    

} else if (usuarioActivo && user.role === "client" && sessionStatus === true) {
    window.location.href = "../DashboardCliente/cliente.html";
   
    
  
} else {
 
    window.location.href = "../../index.html";
}

// FUNCION #2: Cerrar sesión 
/* const botonCerrarSesion = document.getElementById("cerrar");
botonCerrarSesion.addEventListener("click", cerrarSesion);

function cerrarSesion() {
    
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const usuarioActivo = users.find(user => user.isActive);

    if (usuarioActivo) {
      
        usuarioActivo.isActive = false;
        localStorage.setItem("users", JSON.stringify(users));

      
        window.location.href = "/practica/index.html";
    }
}
 */



/* 
},


  

} */ 