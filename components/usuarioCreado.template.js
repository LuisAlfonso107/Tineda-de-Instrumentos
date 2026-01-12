export const usuarioCreadoTemplate = {

    init(obj) {
        return `
   <section class="dashboard-section">
        <!-- Fondo sutil dorado -->
        <div class="dashboard-bg"></div>

        <!-- HEADER PEQUEÑO Y ELEGANTE -->
        <header class="user-header">
          <div class="header-container">
            <a href="/" class="logo">
              <span class="logo-text">Symphony</span>
            </a>
            
            <div class="user-actions">
              <span class="user-name">¡Hola, 'Usuario'</span>
              <a href="/pages/login.html" class="btn-logout-small">
                <i class="fas fa-sign-out-alt"></i> Salir
              </a>
            <div class="usuario">
                <ul>
                    <li><a href="#" data-idioma="navbar.guitar">Guitarra</a></li>
                    <li><a href="#" data-idioma="navbar.amplification">Amplificación</a></li>
                    <li><a href="#" data-idioma="navbar.effects">Efectos</a></li>
                    <li><a href="#" data-idioma="navbar.bass">Bajos</a></li>                
                </ul>
            </div>
          </div>
        </header>

          <!-- Título bienvenida -->
          <div class="welcome-title">
            <h1>Tu panel de control</h1>
            <p>Todo lo que necesitas, en un solo lugar</p>
          </div>

        <div class="dashboard-container">

          <!-- Grid de tarjetas -->
          <div class="dashboard-grid">

            <!-- Perfil + Saldo -->
            <div class="card">
              <div class="card-icon">
              <i class="fas fa-user-circle"></i>
              </div>
              <h3>Mi Perfil</h3>
              <p><strong>'usuario@ejemplo.com'}</strong></p>
              <p>Miembro desde Dic 2025</p>
              <div class="saldo-highlight">
                <span>Saldo:</span>
                <strong class="saldo-amount">$245.80</strong>
              </div>
              <button class="btn-primary">Recargar saldo</button>
            </div>

            <!-- Pedidos activos -->
            <div class="card">
              <div class="card-icon">
              <i class="fas fa-truck"></i>
              </div>
              <h3>Pedidos Activos <span class="badge">3</span></h3>
              <ul class="list-simple">
                <li>#1001 → En camino <span class="tag success">Mañana</span></li>
                <li>#0998 → Procesando <span class="tag warning">Preparando</span></li>
                <li>#0995 → Enviado <span class="tag info">Hoy</span></li>
              </ul>
              <a href="#" class="link">Ver todos los pedidos →</a>
            </div>

            <!-- Facturación -->
            <div class="card">
              <div class="card-icon">
              <i class="fas fa-file-invoice-dollar"></i>
              </div>
              <h3>Últimas Facturas</h3>
              <div class="invoice-row">Factura #F2025-089 <span>$89.99</span></div>
              <div class="invoice-row">Factura #F2025-074 <span>$149.00</span></div>
              <a href="#" class="link">Descargar todas →</a>
            </div>

           

            <!-- Soporte -->
            <div class="card support-card">
              <div class="card-icon">
              <i class="fas fa-headset"></i>
              </div>
              <h3>Soporte 24/7</h3>
              <p>¿Problemas? Estamos aquí para ayudarte</p>
              <div class="btn-group">
                <button class="btn-whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
                </button>
                <button class="btn-ticket">
                <i class="fas fa-ticket-alt"></i> Ticket
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
 
        `
    }

}