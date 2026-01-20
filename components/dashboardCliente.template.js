export const dashboardClienteTemplate = {
  init() {
    return `
      <div class="dashboardCliente-container"> 
        
        <aside class="sidebar">
          <h2>MusicStore</h2>
          <ul>
            <li>Ir a la tienda</li>
            <li>Mis Pedidos</li>
            <li>Carrito</li>
            <li>Favoritos</li>  
            <li>Mi Cuenta</li>
            <button id="logout"><li>Cerrar Sesión</li></button>
           
          
          </ul>
        </aside>

        <div class="topbar">
          <h1>Panel del Cliente</h1>
          <div id="user"></div>
        </div>

        <div class="cards">
          <div class="card">
            <h3>Pedidos Totales</h3>
            <p>12</p>
          </div>
          <div class="card">
            <h3>Pedidos Activos</h3>
            <p>2</p>
          </div>
          <div class="card">
            <h3>Favoritos</h3>
            <p>8</p>
          </div>
          <div class="card">
            <h3>Gasto Total</h3>
            <p>$1,450</p>
          </div>
        </div>

        <section class="section">
          <h2>Pedidos Recientes</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1023</td>
                <td>Guitarra Eléctrica</td>
                <td>10/01/2026</td>
                <td>En camino</td>
              </tr>
              <tr>
                <td>#1018</td>
                <td>Batería Acústica</td>
                <td>02/01/2026</td>
                <td>Entregado</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section class="section">
          <h2>Recomendados para ti</h2>
          <div class="products">
            <div class="product">
              <h4>Teclado MIDI</h4>
              <p>$250</p>
              <button>Ver Producto</button>
            </div>
            <div class="product">
              <h4>Amplificador Marshall</h4>
              <p>$480</p>
              <button>Ver Producto</button>
            </div>
            <div class="product">
              <h4>Pedal de Distorsión</h4>
              <p>$120</p>
              <button>Ver Producto</button>
            </div>
          </div>
        </section>

      </div>
    `
  }
}
