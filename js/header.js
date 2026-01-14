import { headerTemplate } from "../components/header.template.js"
import { cart } from "../components/cart/cart.js"

export const header = {

    id: `header`,
    divId: `headerDiv`,
    cartCount: cart.cartCount,

    init() {
        let exist = document.querySelector(`#${this.divId}`) ? true : false;

        if (!exist) {
            this.render();
        }
    },

    getTemplate(obj) {
        try {
            return headerTemplate.init(obj);
        } catch (error) {
            console.error('Error al cargar el header:', error);
        }
    },

    render() {
        let output = document.querySelector(`#${this.id}`);
        if (output) {
            output.innerHTML = this.getTemplate({ cartCount: this.cartCount });

            // NO BORRAR: Traduce el contenido nuevo del header
            if (window.idioma) {
                window.idioma.translatePage();
            }

        }
    },



    async buscarInstrumentos(buscar) {
        const respuesta = await fetch("/data/products.json");
        const instrumento = await respuesta.json();

        const resultados = instrumento.filter(item =>
            item.nombre.toLowerCase().includes(buscar.toLowerCase())
        );

        return resultados;
    },

    mostrarResultados(resultados) {
        const contenedor = document.getElementById("search-results");
        contenedor.innerHTML = ""; // este me permite borrar resultado 

        if (resultados.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron resultados</p>";
            return;
        }

        resultados.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("resultado-item");
            div.innerHTML = `<p>${item.nombre}</p>`;

            div.addEventListener("click", () => {
                window.location.href = `../pages/paginaDetalle.html?id=${item.id}`;
            });

            contenedor.appendChild(div);
        });
    },
    // Función para actualizar el enlace de cuenta (login / mi cuenta)
login() {
    const texto = document.getElementById("texto");
    const icono = document.getElementById("icono");
    const enlace = document.getElementById("link-cuenta");


    const userStr = localStorage.getItem("currentUser");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user && user.isActive) {

        // para cunado el usuario está logueado y activo

        texto.textContent = "Mi cuenta";
        icono.style.color = "green";

        enlace.onclick = () => {
            if (user.role === "admin") {
                window.location.href = "../pages/dashBoardAdmin.html";
            } 
            else if (user.role === "cliente") {   // ← nota: "cliente" en minúscula
                window.location.href = "../pages/dashboardCliente.html";
            }
        
        };
    } 
    else {
        // para cuando no hay usuario logueado o no está activo
        texto.textContent = "Iniciar sesión";
        icono.style.color = "black";

        enlace.onclick = () => {
            window.location.href = "../pages/login.html";
        };
    }
},

render() {
  const output = document.querySelector(`#${this.id}`);
  if (output) {
    output.innerHTML = this.getTemplate({ cartCount: cart.cartCount });
    headerTemplate.initDateTime(); // Aquí se activa el reloj
  }
}
}