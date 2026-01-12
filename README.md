
# 🎵 Symphony Store – E-commerce de Instrumentos Musicales #

**Symphony Store** es una tienda en línea especializada en la venta de instrumentos musicales, desarrollada con una arquitectura modular en JavaScript. El proyecto está diseñado para ser escalable, mantenible y fácil de extender por múltiples colaboradores.

---

## 1. Estructura del Proyecto ##

plan de archivos y carpetas:

```plaintext
.
├── components
│   ├── cart
│   │   ├── cart.js
│   │   ├── controller.js
│   │   ├── style.css
│   │   ├── template.js
│   │   └── view.js
│   ├── clientes .template.js
│   ├── footer.template.js
│   ├── header.template.js
│   ├── login.template.js
│   ├── navbar.template.js
│   ├── paginaDetalle.template.js
│   ├── registro.template.js
│   └── usuarioCreado.template.js
├── css
│   ├── catalogo.css
│   ├── checkout.css
│   ├── contacto.css
│   ├── footer.css
│   ├── header.css
│   ├── index.css
│   ├── login.css
│   ├── paginaDetalle.css
│   ├── registro.css
│   ├── usuarioCreado.css
│   └── vars.css
├── data
│   └── products.json
├── img
├── index.html
├── js
│   ├── checkout.js
│   ├── contacto.js
│   ├── footer.js
│   ├── header.js
│   ├── idioma.js
│   ├── login.js
│   ├── main.js
│   ├── navbar.js
│   ├── productoDetalle.js
│   ├── products.js
│   ├── registro.js
│   └── usuarioCreado.js
├── lang
│   ├── en_COMPLETO.json
│   ├── es_COMPLETO.json
│   └── eu_COMPLETO.json
├── pages
│   ├── checkout.html
│   ├── contacto.html
│   ├── footer.html
│   ├── login.html
│   ├── paginaDetalle.html
│   ├── registro.html
│   └── usuarioCreado.html
└── README.md
```

## 2. Arquitectura modular ##

El proyecto está organizado por componentes reutilizables: `header`, `navbar`, `footer`, `cart`, `products`, `template.js`: estructura HTML del componente,`controller.js`: lógica de negocio, `view.js`: renderizado y eventos y `style.css`: estilos específicos del módulo.

Cada componente tiene su propio archivo JavaScript (lógica) y CSS (estilos), lo que permite escalabilidad y un mantenimiento más limpio.

---

## 3. Separación de responsabilidades ##

- `main.js` orquesta la aplicación: carga datos, inicializa componentes y gestiona eventos.
- `products.js` se encarga de obtener y renderizar los productos.
- `cart.js` y `controller.js` gestionan el carrito de compras.

Este enfoque sigue el principio de **Single Responsibility**: cada módulo hace una sola cosa y la hace bien.

---

## 4. Renderizado dinámico ##

Los productos no están escritos directamente en HTML, sino que se generan dinámicamente a partir de un archivo JSON.

Esto permite que el catálogo sea **escalable y mantenible**: solo necesita modificar el JSON para actualizar el contenido.

---

## 5. Eventos y DOM ##

Se utiliza `addEventListener` para manejar interacciones como búsquedas o clics en el carrito.

> Esta es la base de la aplicación interactiva: **escuchar al usuario y responder dinámicamente**.
---

## 6. Funcionalidades principales ##

- **Carrito de compras**  🛒 con contador dinámico
- **Buscador de productos** con resultados en tiempo real
- **Navegación modular** (header, navbar, footer)
- **Widget de fecha y hora** multilingüe integrado en el header
- **Diseño responsive** con estilos personalizados
- **Arquitectura modular** basada en componentes reutilizables

---

## 7. Créditos ##

Proyecto desarrollado por el equipo ThunderCode:

- Mirel (JSON y renderización de productos)

- Alfonso (Página detalles, header y navbar)

- Stiwar (Utilidades Lang, footer y diseño visual)

- Youssef (Checkout y Contacto)

- Yoandres (carrito y lógica de productos)

## Licencia ##

Este proyecto es de uso académico y colaborativo. Todos los derechos reservados por el equipo ThunderCode pertenecientes al Bootcamp Fullstack de Peñascal F5. Imagenes obtenidas de fuentes libres de derechos.
