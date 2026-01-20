import { dashboardClienteTemplate } from "../components/dashboardCliente.template.js";

export const dashboardCliente = {
  container: document.getElementById("dashboardCliente-main"),

  init() {
    const user = JSON.parse(localStorage.getItem("currentUser")) || [];

    // 🔐 Redirecciones según rol
    if (!user || !user.isActive) {
      window.location.href = "../index.html";
      return;
    }

    if (user.role === "admin") {
      window.location.href = "../pages/dashBoardAdmin.html";
      return;
    }

    if (user.role !== "client") {
      window.location.href = "../index.html";
      return;
    }

    //  Renderizar template
    if (this.container) {
      this.container.innerHTML = dashboardClienteTemplate.init(user);
    }

    // Saludo
    const saludo = document.getElementById("user");
    if (saludo) {
      saludo.innerText = `Hola, ${user.name} `;
    }

    //  Logout
    const botonCerrarSesion = document.getElementById("logout");
    if (botonCerrarSesion) {
      botonCerrarSesion.addEventListener("click", function ()  {

        // Crear modal de confirmación
        const modal = document.createElement("div");
        modal.classList.add("modal");

        const modalContent = document.createElement("p");
        modalContent.textContent = "¿Estás seguro de que deseas cerrar sesión?";

        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Sí";

        const cancelButton = document.createElement("button");
        cancelButton.textContent = "No";

        modal.appendChild(modalContent);
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);
        document.body.appendChild(modal);

        // Confirmar logout
        confirmButton.addEventListener("click", () => {
          cerrarSesion();
          document.body.removeChild(modal);
        });

        // Cancelar logout
        cancelButton.addEventListener("click", () => {
          document.body.removeChild(modal);
        });

        function cerrarSesion() {
          const currentUser = JSON.parse(localStorage.getItem("currentUser"));
          if (currentUser) {
            currentUser.isActive = false;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
          }
          window.location.href = "../index.html";
        }
      });
    }
  },
};

// Auto-inicialización
dashboardCliente.init();
