/* no borrar este import es necesario para llamar a la funcion de addItem(id) para agregar item al carrito
se usa en el escuchador del evento click que esta al final*/
import { cart } from "../components/cart/cart.js"
/* no borrar :) */

export const productsController = {
    data: [],
    async getData(){
        try {
            const result = {}
            const response = await fetch("../data/products.json")
            if (!response.ok) {
                throw new Error('La red respondió con un error.')
            }
            const data = await response.json()
            const setLS = this.setLocalStorage(data)
            if (setLS.status) {
                this.data = data
            }
            else{
                const getLS = this.getLocalStorage()
                if (getLS.status) {
                    this.data = getLS.data
                }
                else{   
                    console.log(getLS.msg)
                }
            }
        }
        catch (error) {
            console.error('Hubo un problema con la petición fetch:', error);
        }
    },

    getById(id){
        const result = {}
        if (this.data.length > 0) {
            result.data = this.data.filter(function (value, index) {
                if (value.id === id) {
                    return value
                }
            })
            if (result.data.length > 0) {
                result.status = true
            }
            else {
                result.status = false
                result.mensaje = `No existe un producto con el id: ${id}`
            }
        }
        else {
            result.status = false
            result.mensaje = `No hay productos en la data para buscar el id ${id}`
        }
        return result
    },

    getByCategory(category) {
        const result = {}
        if (this.data.length > 0) {
            result.data = this.data.filter(
                value => value.categoria.toLowerCase() === category.toLowerCase()
            )
            if (result.data.length > 0) {
                result.status = true
            } else {
                result.status = false
                result.mensaje = `No existe un producto con la categoria: ${category}`
            }
        } else {
            result.status = false
            result.mensaje = "No hay data para filtrar la categoria"
        }
        return result
    },

    searchString(q) {
        const result = {}
        if (this.data.length > 0) {
            result.data = this.data.filter(value =>
                value.nombre.toLowerCase().includes(q.toLowerCase()) ||
                value.categoria.toLowerCase().includes(q.toLowerCase()) ||
                value.descripcion.toLowerCase().includes(q.toLowerCase())
            )
            if (result.data.length > 0) {
                result.status = true
            } else {
                result.status = false
                result.mensaje = `No existe un producto con el string: ${q}`
            }
        } else {
            result.status = false
            result.mensaje = "No hay data para filtrar la búsqueda"
        }
        return result   // 🔹 corregido: antes devolvía "products"
    },
    /* No borrar las funciones setLocalStorage y getLocalStorage*/
    setLocalStorage(obj){
        const result = {}
        const products = JSON.parse(localStorage.getItem("products")) || []        
        if (products.length <= 0){
            localStorage.setItem('products', JSON.stringify(obj))
            result.status = true
            result.msg = `products enviados a Local Storage`
        }
        else{
            result.status = false
            result.msg = `no se pudo enviar los productos a local storage` 
        }
        return result
    },
    getLocalStorage(){
        const result = {}
        const products = JSON.parse(localStorage.getItem("products")) || [];
        if (products.length > 0){
            result.data = products
            result.status = true
            result.msg = "obtenido de LocalStorage"
        }
        else{
            result.status = false
            result.msg = `no se pudo obtener los productos de LocalStorage` 
        }
        return result
    },
    /* no borrar lo de arriba */
    render() {
        // 1) Precondiciones
        if (!this.data || this.data.length === 0) {
            console.warn("No hay productos para renderizar.")
            return
        }

        const contenedorGeneral = document.getElementById("catalogo-container")
        if (!contenedorGeneral) {
            console.log("No se encontró el contenedor #catalogo-container")
            return
        }

        // 2) Limpieza del contenedor
        contenedorGeneral.innerHTML = ""

        // 3) Agrupación de productos por categoría
        const categorias = {}
        this.data.forEach(producto => {
            const cat = (producto.categoria || "").trim()
            if (!categorias[cat]) categorias[cat] = []
            categorias[cat].push(producto)
        })

        // 4) Renderización de secciones por categoría
        for (const [categoria, productos] of Object.entries(categorias)) {
            const categoriaId = categoria.trim().toLowerCase().replace(/\s+/g, "-")

            const seccion = document.createElement("section")
            seccion.id = categoriaId

            const titulo = document.createElement("h2")
            titulo.textContent = categoria
            seccion.appendChild(titulo)

            const grid = document.createElement("div")
            grid.className = "catalogo"

            // 5) Tarjetas
            productos.forEach(producto => {
                const tarjeta = document.createElement("article")
                tarjeta.className = "producto"
                tarjeta.id = `producto-${producto.id}`

                const imagen = (producto.imagenes && producto.imagenes[0]) ? producto.imagenes[0] : ""

                tarjeta.innerHTML = `
                    <a class="linkToDetails" data-id="${producto.id}" href="./pages/paginaDetalle.html?id=${producto.id}">
                        <figure class="producto__media">
                        <img src="${imagen}" alt="${producto.nombre}">
                        </figure>
                        <h3 class="producto__titulo">${producto.nombre}</h3>
                        <p class="producto__categoria">Categoría: ${producto.categoria}</p>
                        <p class="producto__precio">Precio: €${Number(producto.precio).toFixed(2)}</p>
                    </a> 
                    <a class="cartAddItemBtn" data-id="${producto.id}" href="#"><i class="fa-solid fa-cart-plus"></i>Agregar al carrito</a>
                `
                grid.appendChild(tarjeta)
            })

            seccion.appendChild(grid)
            contenedorGeneral.appendChild(seccion)
        }

        // 6) Escuchador de botones "Añadir al carrito"
        const btnsAddToCart = document.querySelectorAll(".cartAddItemBtn")
        if (btnsAddToCart.length > 0) {
            btnsAddToCart.forEach(btnElement => {
                const id = Number(btnElement.dataset.id)
                btnElement.addEventListener("click", e => {
                    e.preventDefault()
                    cart.addItem(id)
                })
            })
        } else {
            console.log(`no se encontraron los botones de añadir al carrito`);
        }
        /* Fin del escuchador no borrar :) */

        // NO BORRAR: Traduce los productos nuevos
        if (window.idioma) {
            window.idioma.translatePage();
        }
    }
}
