import { navbarTemplate } from "../components/navbar.template.js"

export const navbar = {

    id: `navbar`,
    divId: `navbarDiv`,

    getTemplate(obj) {
        try {
            return navbarTemplate.init(obj)
        } catch (error) {
            console.error('Error al cargar el navbar:', error)
        }
    },

    render() {
        let output = document.querySelector("#navbar")
        if (output) {
            output.innerHTML = this.getTemplate({})

            // NO BORRAR: Traduce el contenido nuevo del navbar
            if (window.idioma) {
                window.idioma.translatePage();
            }

            // Añadido: activa los listeners de categorías
            this.attachCategoryListeners()
        }
    },

    // Añadido: normaliza el nombre de categoría a un ID válido
    normalizeCategoryToId(name) {
        return (name || "").trim().toLowerCase().replace(/\s+/g, "-")
    },

    // Añadido: conecta los botones del navbar con las secciones del catálogo
    attachCategoryListeners() {
        const links = document.querySelectorAll(`#${this.divId} a[data-category]`)
        if (!links || links.length === 0) return

        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault()
                const categoryName = link.getAttribute("data-category")
                const targetId = this.normalizeCategoryToId(categoryName)
                let section = document.getElementById(targetId)

                if (!section) {
                    setTimeout(() => {
                        section = document.getElementById(targetId)
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth", block: "start" })
                        } else {
                            /* window.location.hash = `#${targetId}` */
                            window.location.assign(`../index.html#${targetId}`)
                        }
                    }, 100)
                    return
                }

                section.scrollIntoView({ behavior: "smooth", block: "start" })
            })
        })
    }
}