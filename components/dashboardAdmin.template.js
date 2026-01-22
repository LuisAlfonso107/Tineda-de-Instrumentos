export const dashboardAdminTemplate = {

    init(obj){
        return `
         <div class="container">
        <aside>
            <nav>
                <ul>
                    <li><a href="../index.html">Ir a la tienda</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><button id="btn-add-product">Agregar Producto</button></li>
                   <a href="#cerrar-link"><li id="cerrar-link">Cerrar Sesión</li></a>
                </ul>
            </nav>
        </aside>
        <main>
            <section id="general">
                <h2>Panel General</h2>
                <div class="metrics">
                    <div class="card">
                        <h3>Total de Usuarios</h3>
                        <div class="value">1,250</div>
                    </div>
                    <div class="card">
                        <h3>Total de Administradores</h3>
                        <div class="value">5</div>
                    </div>
                    <div class="card">
                        <h3>Total de Productos</h3>
                        <div class="value">450</div>
                    </div>
                    <div class="card">
                        <h3>Ventas Totales</h3>
                        <div class="value">$150,000</div>
                    </div>
                </div>
            </section>
            
            <section id="productos">
                <h2>Gestión de Productos</h2>
                <button id="add-product-btn">Agregar Producto</button>
                <div class="productsOut" id="productsOut"></div>
            </section>
        </main>
    </div>
        `
    },
    confirmLogout() {
        return `
        <div class="modal">
            <p>¿Estás seguro de que deseas cerrar sesión?</p>
            <button id="confirm-logout">Sí</button>
            <button id="cancel-logout">No</button>
        </div>
        `;
    },

    crearNuevoProducto() {
        return `
      <div class="product-modal">
        <div>
          <h2>Agregar Producto</h2>

          <form id="product-form">
            <input type="hidden" id="product-id">

            <label>Nombre</label>
            <input type="text" id="name" required>

            <label>Precio</label>
            <input type="number" id="price" required>

            <label>Stock</label>
            <input type="number" id="stock" required>

            <label>Categoría</label>
            <input type="text" id="category" required>

            <!-- Modificación: Cambié de input text a file para subir imagen -->
            <label>Imagen</label>
            <input type="file" id="image" accept="image/*">

            <div class="actions">
              <button type="submit">Guardar Producto</button>
              <button type="button" id="cancel-product">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
        `;
    },

    updateProduct(obj) {
        return `
      <div id="updateProductModal" class="product-modal">
        <div>
          <h2>Editar Producto</h2>

          <form id="updateProductForm">
            <input type="hidden" id="updateProductId" value="${obj.id}">

            <label>Nombre</label>
            <input type="text" id="updateProductName" value="${obj.nombre}"required>

            <label>Precio</label>
            <input type="number" id="updateProductPrice" value="${obj.precio}" required>

            <label>Stock</label>
            <input type="number" id="updateProductStock" value="${obj.stock}" required>

            <label>Categoría</label>
            <input type="text" id="updateProductCategory" value="${obj.categoria}" required>

            <label>Descripción</label>
            <textarea id="updateProductDescription" name="updateProductDescription" rows="5" value="${obj.descripcion}">${obj.descripcion}</textarea>

            <div class="actions">
              <button class="productUpdateBtn" type="submit" id="saveUpdateProduct">Guardar Producto</button>
              <button type="button" id="cancelUpdateProduct">Cancelar</button>
            </div>

            
          </form>
          
        </div>
      </div>
        `;
    },

    productCard(obj){
        return `
            <div class="products" id="product-${obj.id}">
                <a class="linkToDetails" data-id="${obj.id}" href="../pages/paginaDetalle.html?id=${obj.id}">
                    <div class="productImg">
                        <img src="../${obj.imagenes[0]}" alt="${obj.nombre}">
                    </div>
                    <h3 class="productTitle" data-idioma="products.nombre">${obj.nombre}</h3>
                    <p class="productCategory"><span data-idioma="products.categoryLabel">Categoría:</span> <span data-idioma="products.category.category">${obj.categoria}</span></p>
                    <p class="productPrice"><span data-idioma="products.priceLabel">Precio:</span> €${obj.precio}</p>
                </a>
                <button class="productUpdateBtn" data-id="${obj.id}">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <span data-idioma="products.updateBtn">Editar</span>
                </button>
                <button class="productDeleteBtn" data-id="${obj.id}">
                    <i class="fa-regular fa-trash-can"></i>
                    <span data-idioma="products.deleteBtn">Eliminar</span>
                </button>
            </div>
        `
    },

    productNoData(obj){
        return `
            <div class="products" id="productNoData">
                <p>No Hay Products para mostrar</p>
            </div>
        `
    }
    
}
