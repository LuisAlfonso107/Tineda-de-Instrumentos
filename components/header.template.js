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
                        <span id="texto" data-idioma="header.Iniciar seccion">Iniciar sesión</span>
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
initDateTime() {
  const display = document.getElementById("datetimeDisplay");
  if (!display) return;

  const lang = document.documentElement.lang || "es";

  const days = {
    es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    // en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    // eus: ["Igandea", "Astelehena", "Asteartea", "Asteazkena", "Osteguna", "Ostirala", "Larunbata"]
  };

  function update() {
    const now = new Date();
    const day = now.getDay();
    const date = now.toLocaleDateString(lang);
    const time = now.toLocaleTimeString();
    const dayName = days[lang]?.[day] || days["es"][day];
    display.innerHTML = `${dayName}, ${date} - ${time}`;
  }

  update();
  setInterval(update, 1000);
}
}