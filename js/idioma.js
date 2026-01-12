/* Soporta Español (es), Inglés (en), Euskera (eu).
 */

class I18n {
    constructor() {

        // Obtiene el idioma guardado previamente en el navegador (localStorage) o usa 'es' por defecto.
        this.currentLang = localStorage.getItem('language') || 'es_COMPLETO';
        this.translations = {};
        this.supportedLanguages = ['es_COMPLETO', 'en_COMPLETO', 'eu_COMPLETO'];
    }

    /**                     
      @param {string} lang 
     */
    async loadLanguage(lang) {
        // Valida que el idioma sea soportado
        if (!this.supportedLanguages.includes(lang)) {
            console.error(`Language ${lang} not supported`);
            return;
        }

        try {
            const response = await fetch(`../lang/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load language file: ${lang}.json`);
            }

            this.translations = await response.json();
            this.currentLang = lang;

            // Guarda la preferencia del idioma en localStorage
            localStorage.setItem('language', lang);

            // Aplica las traducciones a la página
            this.translatePage();

            // Actualiza el botón activo
            this.updateActiveButton();

            console.log(`Language changed to: ${lang}`);
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }

    /**
     * Traduce todos los elementos con el atributo data-idioma
     */
    translatePage() {
        document.querySelectorAll('[data-idioma]').forEach(element => {
            const key = element.getAttribute('data-idioma');
            const translation = this.getTranslation(key);

            if (translation) {
                // Verifica si el elemento tiene el atributo data-idioma-html para contenido HTML
                if (element.hasAttribute('data-idioma-html')) {
                    element.innerHTML = translation;
                }
                // Verifica si es un input o textarea con placeholder
                else if (element.hasAttribute('data-idioma-placeholder')) {
                    element.placeholder = translation;
                }
                // Verifica si es un input type submit o button con value
                else if (element.hasAttribute('data-idioma-value')) {
                    element.value = translation;
                }
                // Por defecto, traduce el textContent
                else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Translation not found for key: ${key}`);
            }
        });
    }

    /**
     * Obtiene la traducción por clave (e.g., "footer.categories")
     * @param {string} keyPath - Dot-separated key path 
     * @returns {string|null} 
     */
    getTranslation(keyPath) {
        const keys = keyPath.split('.');
        let translation = this.translations;

        for (const key of keys) {
            if (translation && typeof translation === 'object' && key in translation) {
                translation = translation[key];
            } else {
                return null;
            }
        }

        return translation;
    }

    /**
     * Cambia el idioma
     * @param {string} lang - Codigo del idioma
     */
    changeLanguage(lang) {
        if (lang !== this.currentLang) {
            this.loadLanguage(lang);
        }
    }

    /**
     * Actualiza el estado activo de los botones de idioma
     */
    updateActiveButton() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /**
     * Obtiene el idioma actual
     * @returns {string} Codigo del idioma actual
     */
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Crea una instancia global
idioma = new I18n();

// Inicializa al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    idioma.loadLanguage(idioma.currentLang);
});
