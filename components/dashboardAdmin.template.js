export const dashboardAdminTemplate = {

    init(obj){
        return `
         

         <div class="container">
        <aside>
            <nav>
                <ul>
                    <li><a href="#general">Ir a la tienda</a></li>
                    <li><a href="#usuarios">Gestión de Usuarios</a></li>
                    <li><a href="#administradores">Gestión de Administradores</a></li>
                    <li><a href="#productos">Productos</a></li>
                    <li><a href="#pedidos">Pedidos</a></li>
                    <li><a href="#ventas">Ventas</a></li>
                    <li><a href="#reportes">Reportes</a></li>
                    <li><a href="#configuracion">Configuración del Sistema</a></li>
                    <li><a href="#estado">Estado del Sistema</a></li>
                    <li><a id="cerrar" href="#cerrar">Cerrar Sesión</a></li>
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
            <section id="usuarios">
                <h2>Gestión de Usuarios</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="client">
                            <td>Juan Pérez</td>
                            <td>juan@example.com</td>
                            <td>Cliente</td>
                            <td>Activo</td>
                        </tr>
                        <tr class="admin">
                            <td>Ana López</td>
                            <td>ana@admin.com</td>
                            <td>Administrador</td>
                            <td>Activo</td>
                        </tr>
                        <tr class="client">
                            <td>Carlos Ruiz</td>
                            <td>carlos@example.com</td>
                            <td>Cliente</td>
                            <td>Inactivo</td>
                        </tr>
                        <!-- Más filas según sea necesario -->
                    </tbody>
                </table>
            </section>
            <section id="administradores">
                <h2>Gestión de Administradores</h2>
                <p>Agrega un nuevo administrador mediante correo electrónico.</p>
                <form>
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" placeholder="Nombre completo">
                    <label for="correo">Correo Electrónico</label>
                    <input type="email" id="correo" placeholder="correo@ejemplo.com">
                    <label for="rol">Rol</label>
                    <select id="rol">
                    
                        <option>Administrador Principal</option>
                    </select>
                    <button type="submit">Agregar Administrador</button>
                </form>
            </section>
            <section id="productos">
                <h2>Gestión de Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Guitarra Eléctrica Fender</td>
                            <td>$500</td>
                            <td>20</td>
                            <td>Guitarras</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Batería Yamaha</td>
                            <td>$800</td>
                            <td>5</td>
                            <td>Percusión</td>
                        </tr>
                        <!-- Más filas -->
                    </tbody>
                </table>
            </section>
            <section id="pedidos">
                <h2>Gestión de Pedidos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1001</td>
                            <td>Juan Pérez</td>
                            <td>2026-01-10</td>
                            <td>$500</td>
                            <td>Enviado</td>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>Ana López</td>
                            <td>2026-01-11</td>
                            <td>$800</td>
                            <td>Pendiente</td>
                        </tr>
                        <!-- Más filas -->
                    </tbody>
                </table>
            </section>
            <section id="ventas">
                <h2>Ventas</h2>
                <p>Resumen de ventas recientes y métricas.</p>
                <!-- Contenido adicional como gráficos placeholders si es necesario -->
            </section>
            <section id="reportes">
                <h2>Reportes</h2>
                <p>Genera reportes detallados de usuarios, ventas y productos.</p>
            </section>
            <section id="configuracion">
                <h2>Configuración del Sistema</h2>
                <p>Ajustes generales de la plataforma.</p>
            </section>
            <section id="estado">
                <h2>Estado del Sistema</h2>
                <div class="status">
                    <div class="status-item">
                        <span>Estado del Servidor:</span>
                        <span class="good">Operativo</span>
                    </div>
                    <div class="status-item">
                        <span>Estado de la Base de Datos:</span>
                        <span class="good">Conectada</span>
                    </div>
                    <div class="status-item">
                        <span>Último Respaldo:</span>
                        <span>2026-01-11 23:00</span>
                    </div>
                </div>
            </section>
            <section id="cerrar">
                <h2>Cerrar Sesión</h2>
                <p>Presiona el botón para cerrar sesión de forma segura.</p>
                <button>Cerrar Sesión</button>
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
    }
    
}
