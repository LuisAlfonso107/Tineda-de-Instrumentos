import { heroTemplate } from "../components/hero.template.js";

export const hero = {
    render: () => {
        const catalog = document.getElementById("catalogo-container");
        if (catalog) {
            catalog.insertAdjacentHTML('beforebegin', heroTemplate);

            // Si el idioma ya está cargado, traducir el hero recién insertado
            if (window.idioma) {
                window.idioma.translatePage();
            }
        }
    }
}
