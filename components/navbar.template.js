export const navbarTemplate = {

    init(obj) {
        return `
            <div id="navbarDiv" class="main-menu">
                <ul>
                    <li><a href="#" data-idioma="navbar.strings" data-category="Cuerdas">Cuerdas</a></li>
                    <li><a href="#" data-idioma="navbar.wind" data-category="Viento">Viento</a></li>
                    <li><a href="#" data-idioma="navbar.percussion" data-category="Percusión">Percusión</a></li>
                    <li><a href="#" data-idioma="navbar.keyboards" data-category="Teclados y pianos">Teclados y pianos</a></li>
                    <li><a href="#" data-idioma="navbar.accessories" data-category="Complementos y accesorios">Complementos y accesorios</a></li>
                </ul>
            </div>
        `
    }

}
