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

render() {
  const output = document.querySelector(`#${this.id}`);
  if (output) {
    output.innerHTML = this.getTemplate({ cartCount: cart.cartCount });
    headerTemplate.initDateTime(); // Aquí se activa el reloj
  }
}
}