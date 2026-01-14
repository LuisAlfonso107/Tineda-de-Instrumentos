import { footerTemplate } from "../components/footer.template.js"

export const footer = {

    id: `footer`,
    divId: `footerDiv`,

    getTemplate(obj) {

        try {

            return footerTemplate.init()

        } catch (error) {
            console.error('Error al cargar el footer:', error)
        }

    },

   render() {
    const output = document.querySelector(`#${this.id}`);

    if (!output) return; // 👈 CLAVE

    output.innerHTML = this.getTemplate();

    // Traducción
    if (window.idioma) {
        window.idioma.translatePage();
    }
}


}