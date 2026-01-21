/* no borrar este import es necesario para llamar a la funcion de addItem(id) para agregar item al carrito
se usa en el escuchador del evento click que esta al final*/
import { cart } from "../components/cart/cart.js"
import { config } from "./config.js"
/* no borrar :) */

export const productsController = {
    data: [],
    async getData(){
        try {
            const result = {}
            const response = await fetch(`${config.endPoints().products}`)
            if (!response.ok) {
                throw new Error('La red respondió con un error.')
            }
            else{
                const data = await response.json()
                /*const setLS =*/ this.setLocalStorage(data)
                this.data = data 
            }                 
            
            /* if (setLS.status) {
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
            } */
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
            console.log("No hay productos para renderizar.")
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
            const categoriaKey = categoria.trim().toLowerCase().replace(/\s+/g, "-");
            const translatedSectionTitle = (window.idioma && idioma.getTranslation(`products.category.${categoriaKey}`)) || categoria;
            titulo.textContent = translatedSectionTitle
            // make the section title translatable on language change
            titulo.setAttribute('data-idioma', `products.category.${categoriaKey}`)
            seccion.appendChild(titulo)

            const grid = document.createElement("div")
            grid.className = "catalogo"

            // 5) Tarjetas
            productos.forEach(producto => {
                const tarjeta = document.createElement("article")
                tarjeta.className = "producto"
                tarjeta.id = `producto-${producto.id}`

                const imagen = (producto.imagenes && producto.imagenes[0]) ? producto.imagenes[0] : ""

                        // Resolve translated strings when possible
                        const translatedName = (window.idioma && idioma.getTranslation(`products.name.${producto.id}`)) || producto.nombre;
                        const categoryKey = (producto.categoria || "").trim().toLowerCase().replace(/\s+/g, "-");
                        const translatedCategory = (window.idioma && idioma.getTranslation(`products.category.${categoryKey}`)) || producto.categoria;

                        tarjeta.innerHTML = `
                    <a class="linkToDetails" data-id="${producto.id}" href="./pages/paginaDetalle.html?id=${producto.id}">
                        <figure class="producto__media">
                        <img src="${imagen}" alt="${producto.nombre}">
                        </figure>
                                <h3 class="producto__titulo" data-idioma="products.name.${producto.id}">${translatedName}</h3>
                                <p class="producto__categoria"><span data-idioma="products.categoryLabel">Categoría:</span> <span data-idioma="products.category.${categoryKey}">${translatedCategory}</span></p>
                                <p class="producto__precio"><span data-idioma="products.priceLabel">Precio:</span> €${Number(producto.precio).toFixed(2)}</p>
                    </a> 
                        `
                        const addBtn = document.createElement('a');
                        addBtn.className = 'cartAddItemBtn';
                        addBtn.href = '#';
                        addBtn.dataset.id = producto.id;
                        addBtn.innerHTML = `<i class="fa-solid fa-cart-plus"></i> <span data-idioma="products.addToCartBtn">Agregar al carrito</span>`;
                        // append the add button inside the tarjeta, then append tarjeta once to the grid
                        tarjeta.appendChild(addBtn);
                        grid.appendChild(tarjeta);
            })

            seccion.appendChild(grid)
            contenedorGeneral.appendChild(seccion)
        }

        // 6) Escuchador de botones "Añadir al carrito"
        const btnsAddToCart = document.querySelectorAll(".cartAddItemBtn")
        if (btnsAddToCart.length > 0) {
            btnsAddToCart.forEach(btnElement => {
                const id = btnElement.dataset.id
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
    },
    validateProduct(product){
        const result = {}
        if (product.nombre === "" || typeof(product.nombre) !== "string"){
            result.status = false
            result.msg= "el nombre no es valido, debe ser un string no vacio"
        }
        else if(product.categoria === "" || typeof(product.categoria) !== "string"){
            result.status = false
            result.msg = "la ctegoria no es valida, debe ser un string no vacio"
        }
        else if(product.precio === "" || typeof(product.precio) !== "number"){
            result.status = false
            result.msg = "el precio no es valido, debe ser un number no vacio"  
        }
        else if(product.descuento === "" || typeof(product.descuento) !== "number"){
            result.status = false
            result.msg = "el descuento no es valido, debe ser un number no vacio"    
        }
        else if(product.IVA === "" || typeof(product.IVA) !== "number"){
            result.status = false
            result.msg = "el IVA no es valido, debe ser un number no vacio"     
        }
        else if(product.stock === "" || typeof(product.stock) !== "number" || !Number.isInteger(product.stock)){
            result.status = false
            result.msg = "el stock no es valido, debe ser un numero entero no vacio"   
        }
            else if(product.status === "" || typeof(product.status) !== "string"){
            result.status = false
            result.msg = "el status no es valido, debe ser un string no vacio" 
            
        } else if(product.descripcion === "" || typeof(product.descripcion) !== "string"){
            result.status = false
            result.msg = "la descripcion no es valida, debe ser un string no vacio"     
        }
        else if(typeof(product.caracteristicas)!=="object" || product.caracteristicas === null || Object.keys(product.caracteristicas).length <= 0 ){
            result.status = false
            result.msg = "las caracteristicas no son validas, deben ser un objeto no vacio" 
        }
        else if(!Array.isArray(product.imagenes) && product.imagenes.length <= 0){
            result.status = false
            result.msg = "las imagenes no son validas, deben ser un Array no vacio" 
        }
        else{
            result.status = true
            result.msg = "datos de producto valido"
        } 

        return result

    },
    async createProduct(product) {
        const result = {}
        try {
            
            const validate = this.validateProduct(product)

            if(validate.status){
                const existsProduct = await this.existsProduct(product.nombre)
                if(existsProduct.status){
                    result.status = false
                    result.msg = existsProduct.msg
                }
                else{
                    const url = `${config.endPoints().products}`
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(product),
                    }
                    const response = await fetch(url, options);
                    if(!response.ok){
                        result.status=false
                        result.msg="la red respondio con error: no se pudo registrar el producto"
                        throw new Error ("la red respondio con error: no se pudo registrar el product") 
                    }
                    else{
                        result.status=true
                        result.msg="producto creado"
                        result.data = await response.json()
                    }
                }
            }
            else{
                result.status = false
                result.msg= validate.msg
            }                    
        }
        catch (error) {
            result.status=false
            result.msg="un problema con createProduct"
            console.error("un problema con createOrder:", error);
        }  
        return result    
    },
    async existsProduct(nombre){
        const result={}
        try {
            const url = `${config.endPoints().products}?nombre=${nombre}`
            const response = await fetch(url);
            if(!response.ok){
                result.status=false
                result.msg="la red respondio con error"
                throw new Error ("la red respondio con error")
            }
            else{
                const productData = await response.json()
                // Evitar duplicar productos  
                if(productData.length > 0){
                    result.status = true
                    result.msg = "producto existe"        
                }
                else{
                    result.status = false
                    result.msg = "producto no existe"
                }
            }
        
        } catch (error) {
            result.status = false
            result.msg = "un problema con existsProduct"
            console.error("un problema con existsProduct:", error);
        }
        return result
    },
    async updateProduct(product) {
        const result = {}
        try {
            const validate = this.validateProduct(product)

            if(validate.status){
                const url = `${config.endPoints().products}/${product.id}`
                const options = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                }
                const response = await fetch(url, options);
                if(!response.ok){
                    result.status=false
                    result.msg="la red respondio con error: no se pudo registrar el producto"
                    throw new Error ("la red respondio con error: no se pudo registrar el product") 
                }
                else{
                    result.status=true
                    result.msg="producto actualizado"
                    result.data = await response.json()
                }
            }
            else{
                result.status = false
                result.msg= validate.msg
            }                    
        }
        catch (error) {
            result.status=false
            result.msg="un problema con updateProduct"
            console.error("un problema con updateProduct:", error);
        }  
        return result    
    },
    async deleteProduct(product) {
        const result = {}
        try {
            const url = `${config.endPoints().products}/${product.id}`
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(url, options);
            if(!response.ok){
                result.status=false
                result.msg="la red respondio con error: no se pudo eliminar el producto"
                throw new Error ("la red respondio con error: no se pudo registrar el product") 
            }
            else {
                result.status=true
                result.msg="producto Eliminado"
                result.data = await response.json()
            }            
        }
        catch (error) {
            result.status=false
            result.msg="un problema con updateProduct"
            console.error("un problema con updateProduct:", error);
        }  
        return result    
    }
}
