export const loginTemplate = {
  init() {
    return `
      <section class="login-section">
        <!-- Fondo animado igual que registro y dashboard -->
        <div class="login-bg"></div>

        <div class="login-container">
          <div class="login-card">
            <!-- Logo / Título -->
            <div class="login-header">
              <h2 data-idioma="login.title">Bienvenido de vuelta</h2>
              <p class="subtitle" data-idioma="login.subtitle">Inicia sesión en tu cuenta</p>
            </div>

            <form id="form-login" novalidate>
              <!-- Email -->
              <div class="form-row">
                <label for="email" data-idioma="login.emailLabel">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  data-idioma-placeholder="login.emailPlaceholder"
                />
                <small class="error" data-for="email"></small>
              </div>

              <!-- Contraseña + ojo -->
              <div class="form-row">
                <label for="password" data-idioma="login.passwordLabel">Contraseña</label>
                <div class="password-wrapper">
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    minlength="8"
                    data-idioma-placeholder="login.passwordPlaceholder"
                  />
                  <button type="button" id="toggle-password" class="toggle-eye">
                    <i class="fas fa-eye"></i>
                  </button>
                </div>
                <small class="error" data-for="password"></small>
              </div>

              <!-- Recordar + olvidé contraseña -->
              <div class="form-options">
                <label class="checkbox-custom">
                  <input type="checkbox" id="remember" />
                  <span class="checkmark"></span>
                  <span data-idioma="login.remember">Recordarme</span>
                </label>
                <a href="#" class="forgot-link" data-idioma="login.forgotPassword">¿Olvidaste tu contraseña?</a>
              </div>

              <!-- Botón principal -->
              <button type="submit" id="btn-login" class="btn-primary" data-idioma="login.loginBtn">Iniciar sesión</button>
            </form>

            <!-- Separador "o" -->
            <div class="divider">
              <span data-idioma="login.orContinueWith">o continúa con</span>
            </div>

            <!-- ¿No tienes cuenta? + Volver -->
            <div class="login-footer">
              <p>
                <span data-idioma="login.firstTime">¿Primera vez aquí?</span>
                <a href="/pages/registro.html" class="link-highlight" data-idioma="login.createAccountLink">Crear cuenta</a>
              </p>
              <a href="/" class="btn-volver" data-idioma="login.backToHome">
                <i class="fas fa-arrow-left"></i> Volver al inicio
              </a>
            </div>

            <div id="login-feedback" aria-live="polite"></div>
          </div>
        </div>
      </section>
    `;
  }
};