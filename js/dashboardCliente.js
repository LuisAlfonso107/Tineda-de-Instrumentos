import { dashboardClienteTemplate } from '../components/dashboardCliente.template.js';

export const dashboardCliente = {
    container: document.getElementById("dashboardCliente-main"),
    
    init() {
        
const user = JSON.parse(localStorage.getItem("user")) || [];
const sessionStatus = JSON.parse(localStorage.getItem("sessionStatus")) || true;
const usuarioActivo = user.isActive


if (usuarioActivo && user.role === "admin" && sessionStatus === true) {
    const saludo = document.getElementById("user");
    saludo.innerText = `Bienvenido ${user.name} 🎵`;
    window.location.href = "./pages/dashBoardAdmin.html";

} else if (usuarioActivo && user.role === "client" && sessionStatus === true) {
    window.location.href = "./pages/dashboardCliente.html";
   
  
} else {
 
    window.location.href = "../../index.html";
}

        
        const botonCerrarSesion = document.getElementById("logout");
        if (botonCerrarSesion) {
            botonCerrarSesion.addEventListener("click", () => {
                usuarioActivo.isActive = false;
                localStorage.setItem("users", JSON.stringify(users));
                window.location.href = "/index.html";
            });
        }
    }
};

  dashboardCliente.init();