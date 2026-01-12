export const detalleTemplate = {
  init(product) {
    // Valores por defecto seguros (destructuración con defaults)
    const {
      id = 0,
      nombre = 'Producto sin nombre',
      categoria = 'Sin categoría',
      precio = 0,
      descuento = 0,
      IVA = 21,
      stock = 0,
      status = 'unavailable',
      descripcion = 'Sin descripción disponible',
      caracteristicas = {},
      imagenes = []
    } = product || {};

    // CÁLCULOS PREVIOS (todo definido aquí arriba) 
    const tieneImagenes = Array.isArray(imagenes) && imagenes.length > 0;
    const imagenPrincipal = tieneImagenes 
      ? '../' + imagenes[0] 
      : 'https://via.placeholder.com/800x800?text=Sin+Imagen';

    const precioFinal = precio * (1 - descuento / 100);
    const precioConIVA = precioFinal * (1 + IVA / 100);

   

    const tieneCaracteristicas = Object.keys(caracteristicas).length > 0;
    // TEMPLATE 
    return `
      <section class="product-detail" aria-labelledby="product-title">
        <div class="product-detail__gallery">
          ${tieneImagenes ? `
            <div class="main-image">
              <img src="${imagenPrincipal}" alt="${nombre} - Imagen principal" loading="lazy">
            </div>
            ${imagenes.length > 1 ? `
              <div class="thumbnails">
                ${imagenes.map(img => `
                  <img src="../${img}" alt="${nombre} - Miniatura" loading="lazy" class="thumbnail">
                `).join('')}
              </div>
            ` : ''}
          ` : `
            <div class="no-image">
              <img src="${imagenPrincipal}" alt="Imagen no disponible" loading="lazy">
            </div>
          `}
        </div>

        <div class="product-detail__info">
          <h1 id="product-title">${nombre}</h1>
          <p class="category">Categoría: <strong>${categoria}</strong></p>

          ${descuento > 0 ? `
            <p class="price-original">Precio original: <del>€${precio.toFixed(2)}</del></p>
            <p class="price-discount">¡-${descuento}% de descuento!</p>
          ` : ''}

          <p class="price-final">Precio: <strong>€${precioFinal.toFixed(2)}</strong></p>
          <p class="price-iva">Precio con IVA (${IVA}%): <strong>€${precioConIVA.toFixed(2)}</strong></p>

      

          <p class="description">${descripcion}</p>
          <button 
            class="btn-add" 
            data-id="${id}" 
            ${stock === 0 ? 'disabled' : ''}>
            ${stock === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>

          ${tieneCaracteristicas ? `
            <div class="features">
              <h2>Características técnicas</h2>
              <ul class="features-list">
                ${Object.entries(caracteristicas).map(([clave, valor]) => {
                  const claveFormateada = clave.charAt(0).toUpperCase() + clave.slice(1).replace(/_/g, ' ');
                  return `<li><strong>${claveFormateada}:</strong> ${valor}</li>`;
                }).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  }
};
