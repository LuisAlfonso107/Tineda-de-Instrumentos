export const headerTemplate = {

    init(obj) {
        return `
        <div class="language-selector">
            <button class="lang-btn active" data-lang="es_COMPLETO" onclick="idioma.changeLanguage('es_COMPLETO')">
                   ES
            </button>
            <button class="lang-btn" data-lang="en_COMPLETO" onclick="idioma.changeLanguage('en_COMPLETO')">
                   EN
            </button>
            <button class="lang-btn" data-lang="eu_COMPLETO" onclick="idioma.changeLanguage('eu_COMPLETO')">
                   EU
            </button>
        </div>
        <div id="headerDiv" class="top-header">
            <div class="logo">
                <a href="../index.html"><img src="../img/logos/logo Symphony store.png" alt="logo"></a>
            </div>

            <div class="search-bar">
                <input id="buscador-input" type="text" data-idioma="header.searchPlaceholder" data-idioma-placeholder placeholder=" Buscar tu instrumento">
                <button id="buscador-btn"  ><i class="fas fa-search"></i></button>
                <div id="search-results"></div>
            </div>

            <div class="top-right">
                <div class="contactanos"><a href="../pages/contacto.html" data-idioma="header.contact">CONTACTANOS</a></div>

                <div class="separator"></div>

                <div class="user-actions">    
                    <a href="#" id="link-cuenta" style="color: #9370DB;">
                        <i class="far fa-user" id="icono" style="font-size: 40px;"></i>
                        <span id="texto" data-idioma="header.myAccount">Iniciar sesión</span>
                    </a>
                    <a id="btnCart" href="#" style="color: #9370DB;">
                        <i class="fas fa-shopping-cart" style="font-size: 40px;"></i> <span data-idioma="header.cart">Carrito</span>
                        <span id="cartCount" class="cart-count">${obj.cartCount ? obj.cartCount : 0}</span>
                    </a>                        
                </div>

                <div class="datetime-widget">
                    <p id="datetimeDisplay"></p>
                </div>
            </div>
        </div>
        `
    },

    // Variable para almacenar el ID del intervalo
    dateTimeInterval: null,

initDateTime() {
  const display = document.getElementById("datetimeDisplay");
  if (!display) return;

    // Limpiar el intervalo anterior si existe
    if (this.dateTimeInterval) {
        clearInterval(this.dateTimeInterval);
    }

    // Obtiene la lista de días desde las traducciones cargadas (header.days)
    const daysFromLang = (window.idioma && idioma.translations && idioma.translations.header && Array.isArray(idioma.translations.header.days))
        ? idioma.translations.header.days
        : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Map language to locale
    const langToLocale = {
        'es_COMPLETO': 'es-ES',
        'en_COMPLETO': 'en-US',
        'eu_COMPLETO': 'eu-ES'
    };
    const currentLang = window.idioma ? idioma.getCurrentLanguage() : 'es_COMPLETO';
    const locale = langToLocale[currentLang] || 'es-ES';

    function update() {
        const now = new Date();
        const day = now.getDay();
        const date = now.toLocaleDateString(locale);
        const time = now.toLocaleTimeString(locale);
        const dayName = daysFromLang[day] || daysFromLang[0];
        display.innerHTML = `${dayName}, ${date} - ${time}`;
    }

    update();
    this.dateTimeInterval = setInterval(update, 1000);
}
}

// Exponer una función global para refrescar el reloj cuando cambie el idioma
if (typeof window !== 'undefined') {
    window.headerInitDateTime = function () {
        try { headerTemplate.initDateTime(); } catch (e) { /* no-op si no está disponible */ }
    }
}