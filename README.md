<div align="center">

# 🎵 Symphony Store

### E-commerce de Instrumentos Musicales

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JSON Server](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=white)](https://github.com/typicode/json-server)

**Symphony Store** es una tienda en línea moderna y completamente funcional especializada en la venta de instrumentos musicales. Desarrollada con una arquitectura modular en JavaScript vanilla, el proyecto está diseñado para ser escalable, mantenible y fácil de extender por múltiples colaboradores.

[Características](#-características-principales) • [Instalación](#-instalación) • [Uso](#-uso) • [Arquitectura](#-arquitectura-del-proyecto) • [Equipo](#-equipo-de-desarrollo)

</div>

---

## 📋 Tabla de Contenidos

- [Características Principales](#-características-principales)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Funcionalidades Detalladas](#-funcionalidades-detalladas)
- [Internacionalización](#-internacionalización)
- [Equipo de Desarrollo](#-equipo-de-desarrollo)
- [Licencia](#-licencia)

---

## ✨ Características Principales

- 🛒 **Carrito de Compras Dinámico** - Sistema completo con contador en tiempo real y persistencia
- 🔍 **Búsqueda Inteligente** - Filtrado de productos con resultados instantáneos
- 🌐 **Multilingüe** - Soporte completo para Español, Inglés y Euskera
- 📱 **Diseño Responsive** - Optimizado para dispositivos móviles, tablets y desktop
- 🎨 **Interfaz Moderna** - Diseño limpio y profesional con UX optimizada
- 🔐 **Sistema de Autenticación** - Registro y login de usuarios
- 📦 **Catálogo Dinámico** - 30+ productos cargados desde JSON
- 💳 **Proceso de Checkout** - Flujo completo de compra
- 📧 **Formulario de Contacto** - Comunicación directa con el equipo
- ⏰ **Widget de Fecha/Hora** - Información en tiempo real multilingüe

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con variables CSS y diseño responsive
- **JavaScript (ES6+)** - Lógica de aplicación modular
- **Font Awesome 6.5.0** - Iconografía profesional

### Backend
- **JSON Server** - API REST simulada para desarrollo
- **Node.js** - Entorno de ejecución para el servidor

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **VS Code** - Editor de código recomendado

---

## 📥 Instalación

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/LuisAlfonso107/Tineda-de-Instrumentos.git
   cd e-commerce
   ```

2. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   ```

3. **Iniciar el servidor JSON**
   ```bash
   npm run dev
   ```
   El servidor estará disponible en `http://localhost:9000`

4. **Abrir la aplicación**
   - Abre el archivo `index.html` en tu navegador
   - O utiliza un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) para VS Code

---

## 🚀 Uso

### Navegación Principal

- **Inicio** - Catálogo completo de productos con búsqueda y filtros
- **Categorías** - Cuerdas, Percusión, Viento, Teclados, Accesorios
- **Carrito** - Gestión de productos seleccionados
- **Checkout** - Proceso de compra
- **Contacto** - Formulario de comunicación

### Funcionalidades de Usuario

1. **Explorar Productos**
   - Navega por el catálogo de 30+ instrumentos musicales
   - Utiliza la búsqueda para encontrar productos específicos
   - Filtra por categorías

2. **Gestión del Carrito**
   - Añade productos al carrito
   - Modifica cantidades
   - Elimina productos
   - Visualiza el total en tiempo real

3. **Proceso de Compra**
   - Completa el formulario de checkout
   - Revisa tu pedido
   - Finaliza la compra

4. **Cambio de Idioma**
   - Selecciona entre Español, Inglés o Euskera
   - Todo el contenido se traduce automáticamente

---

## 📁 Estructura del Proyecto

```plaintext
e-commerce/
│
├── backend/                    # Servidor JSON y datos
│   ├── data.json              # Base de datos de usuarios y pedidos
│   ├── package.json           # Dependencias del backend
│   └── node_modules/          # Módulos de Node.js
│
├── components/                 # Componentes reutilizables
│   ├── cart/                  # Módulo del carrito de compras
│   │   ├── cart.js           # Lógica principal del carrito
│   │   ├── controller.js     # Controlador del carrito
│   │   ├── style.css         # Estilos del carrito
│   │   ├── template.js       # Template HTML del carrito
│   │   └── view.js           # Vista y renderizado
│   ├── header.template.js     # Template del header
│   ├── navbar.template.js     # Template de navegación
│   ├── footer.template.js     # Template del footer
│   ├── login.template.js      # Template de login
│   ├── registro.template.js   # Template de registro
│   ├── paginaDetalle.template.js  # Template de detalles
│   ├── dashboardAdmin.template.js # Template admin
│   └── dashboardCliente.template.js # Template cliente
│
├── css/                        # Hojas de estilo
│   ├── vars.css               # Variables CSS globales
│   ├── index.css              # Estilos de la página principal
│   ├── catalogo.css           # Estilos del catálogo
│   ├── header.css             # Estilos del header
│   ├── footer.css             # Estilos del footer
│   ├── login.css              # Estilos de login
│   ├── registro.css           # Estilos de registro
│   ├── checkout.css           # Estilos de checkout
│   ├── contacto.css           # Estilos de contacto
│   ├── paginaDetalle.css      # Estilos de detalles
│   ├── usuarioCreado.css      # Estilos de confirmación
│   ├── hero.css               # Estilos del hero section
│   └── popup.css              # Estilos de popups
│
├── data/                       # Datos de la aplicación
│   └── products.json          # Catálogo de productos (30 items)
│
├── img/                        # Recursos de imágenes
│   ├── cuerdas/               # Imágenes de instrumentos de cuerda
│   ├── percusion/             # Imágenes de percusión
│   ├── viento/                # Imágenes de viento
│   ├── teclados/              # Imágenes de teclados
│   ├── accesorios/            # Imágenes de accesorios
│   └── favicon/               # Favicon del sitio
│
├── js/                         # Scripts JavaScript
│   ├── main.js                # Punto de entrada principal
│   ├── products.js            # Gestión de productos
│   ├── header.js              # Lógica del header
│   ├── navbar.js              # Lógica de navegación
│   ├── footer.js              # Lógica del footer
│   ├── login.js               # Lógica de login
│   ├── registro.js            # Lógica de registro
│   ├── checkout.js            # Lógica de checkout
│   ├── contacto.js            # Lógica de contacto
│   ├── productoDetalle.js     # Lógica de detalles
│   ├── usuarioCreado.js       # Lógica de confirmación
│   ├── idioma.js              # Sistema de internacionalización
│   └── popup.js               # Lógica de popups
│
├── lang/                       # Archivos de traducción
│   ├── es_COMPLETO.json       # Traducciones en Español
│   ├── en_COMPLETO.json       # Traducciones en Inglés
│   └── eu_COMPLETO.json       # Traducciones en Euskera
│
├── pages/                      # Páginas HTML
│   ├── login.html             # Página de login
│   ├── registro.html          # Página de registro
│   ├── checkout.html          # Página de checkout
│   ├── contacto.html          # Página de contacto
│   ├── paginaDetalle.html     # Página de detalles
│   ├── usuarioCreado.html     # Página de confirmación
│   ├── dashboardAdmin.html    # Dashboard de administrador
│   ├── dashboardCliente.html  # Dashboard de cliente
│   ├── footer.html            # Footer reutilizable
│   └── popup.html             # Template de popup
│
├── index.html                  # Página principal
└── README.md                   # Este archivo
```

---

## 🏗️ Arquitectura del Proyecto

### Patrón de Diseño: Arquitectura Modular

Symphony Store implementa una **arquitectura basada en componentes** que sigue los principios de:

#### 1. **Separación de Responsabilidades (SoC)**

Cada módulo tiene una responsabilidad única y bien definida:

- **`main.js`** - Orquestador principal de la aplicación
  - Inicializa componentes
  - Gestiona el flujo de datos
  - Coordina eventos globales

- **`products.js`** - Gestión del catálogo
  - Obtiene productos desde JSON
  - Renderiza el catálogo dinámicamente
  - Maneja filtros y búsquedas

- **`cart/`** - Sistema de carrito completo
  - `cart.js` - Estado y lógica del carrito
  - `controller.js` - Controlador de acciones
  - `view.js` - Renderizado y eventos del DOM
  - `template.js` - Estructura HTML
  - `style.css` - Estilos específicos

#### 2. **Renderizado Dinámico**

Los productos y componentes se generan dinámicamente desde datos JSON:

```javascript
// Ejemplo: Carga de productos desde JSON
fetch('./data/products.json')
  .then(response => response.json())
  .then(products => renderProducts(products));
```

**Ventajas:**
- ✅ Catálogo escalable sin modificar HTML
- ✅ Fácil actualización de contenido
- ✅ Separación de datos y presentación

#### 3. **Sistema de Eventos**

Utiliza `addEventListener` para manejar interacciones del usuario:

```javascript
// Ejemplo: Búsqueda en tiempo real
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  filterProducts(query);
});
```

#### 4. **Componentes Reutilizables**

Cada componente sigue la estructura:

```
component/
├── template.js    # Estructura HTML
├── controller.js  # Lógica de negocio
├── view.js        # Renderizado y eventos
└── style.css      # Estilos específicos
```

---

## 🎯 Funcionalidades Detalladas

### 🛒 Sistema de Carrito

- **Agregar productos** - Desde el catálogo o página de detalles
- **Modificar cantidades** - Incrementar/decrementar unidades
- **Eliminar productos** - Remover items del carrito
- **Cálculo automático** - Subtotal, IVA y total
- **Persistencia** - El carrito se mantiene entre sesiones
- **Contador visual** - Badge con número de items

### 🔍 Búsqueda y Filtrado

- **Búsqueda en tiempo real** - Resultados instantáneos mientras escribes
- **Filtrado por categorías** - Cuerdas, Percusión, Viento, Teclados, Accesorios
- **Búsqueda inteligente** - Busca en nombre, categoría y descripción

### 📦 Catálogo de Productos

El catálogo incluye **30 productos** en 5 categorías:

- **Cuerdas** (10) - Guitarras, bajos, violines, arpas, ukeleles, etc.
- **Percusión** (7) - Baterías, congas, cajones, castañuelas, maracas, etc.
- **Viento** (6) - Clarinetes, trompetas, saxofones, flautas, acordeones
- **Teclados y Pianos** (3) - Pianos digitales, sintetizadores, órganos
- **Complementos y Accesorios** (4) - Amplificadores, fundas, estuches

Cada producto incluye:
- Nombre y categoría
- Precio con IVA
- Descripción detallada
- Características técnicas completas
- Múltiples imágenes
- Stock disponible
- Nivel recomendado (Principiante/Intermedio/Profesional)

### 🔐 Sistema de Usuarios

- **Registro** - Formulario completo de registro
- **Login** - Autenticación de usuarios
- **Dashboards** - Paneles para clientes y administradores
- **Persistencia** - Datos almacenados en JSON Server

### 💳 Proceso de Checkout

1. Revisión del carrito
2. Formulario de datos de envío
3. Selección de método de pago
4. Confirmación del pedido
5. Página de agradecimiento

---

## 🌐 Internacionalización

Symphony Store soporta **3 idiomas** con traducción completa:

| Idioma | Código | Archivo |
|--------|--------|---------|
| 🇪🇸 Español | `es` | `es_COMPLETO.json` |
| 🇬🇧 Inglés | `en` | `en_COMPLETO.json` |
| 🇪🇺 Euskera | `eu` | `eu_COMPLETO.json` |

### Características del Sistema i18n

- **Cambio dinámico** - Sin recargar la página
- **Persistencia** - El idioma seleccionado se guarda
- **Cobertura completa** - Todos los textos traducidos
- **Fácil extensión** - Agregar nuevos idiomas es simple

### Implementación

```javascript
// idioma.js gestiona las traducciones
function changeLanguage(lang) {
  fetch(`./lang/${lang}_COMPLETO.json`)
    .then(response => response.json())
    .then(translations => applyTranslations(translations));
}
```

---

## 👥 Equipo de Desarrollo

**Symphony Store** fue desarrollado por el equipo **ThunderCode** como proyecto del Bootcamp Fullstack de Peñascal F5.

<table>
  <tr>
    <td align="center">
      <h3> Alfonso</h3>
      <p><strong>Frontend Developer</strong></p>
      <p>Página de detalles<br>Header y Navbar</p>
    </td>
    <td align="center">
      <h3>Stiwar</h3>
      <p><strong>UI/UX & i18n</strong></p>
      <p>Sistema de idiomas<br>Footer y diseño visual</p>
    </td>
  </tr>
  <tr>
    <td align="center">
      <h3>Youssef</h3>
      <p><strong>Frontend Developer</strong></p>
      <p>Checkout<br>Página de contacto</p>
    </td>
    <td align="center">
      <h3>Yoandres</h3>
      <p><strong>Frontend Developer</strong></p>
      <p>Sistema de carrito<br>Lógica de productos</p>
    </td>
  </tr>
</table>

---

## 📄 Licencia

Este proyecto es de **uso académico y colaborativo**.

**Derechos:** Todos los derechos reservados por el equipo **ThunderCode** pertenecientes al **Bootcamp Fullstack de Peñascal F5**.

**Imágenes:** Obtenidas de fuentes libres de derechos.

---

<div align="center">

### ⭐ Si te gusta este proyecto, dale una estrella en GitHub

**Hecho con ❤️ por el equipo ThunderCode**

[⬆ Volver arriba](#-symphony-store)

</div>
