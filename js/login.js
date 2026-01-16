import { loginTemplate } from "../components/login.template.js"
import { registro } from "./registro.js"

export const login = {

    loginF () {
        const loElement = document.querySelector('#login')
        if (loElement) {
        
        loElement.innerHTML = loginTemplate.init()
        console.log("esto");
        
            const form = document.querySelector('#form-login');
            const feedback = document.querySelector('#login-feedback');

            // Toggle password visibility
            const toggle = document.querySelector('#toggle-password');
            if (toggle) {
                toggle.addEventListener('click', () => {
                    const pwd = document.querySelector('#password');
                    if (pwd.type === 'password') pwd.type = 'text'; else pwd.type = 'password';
                });
            }

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                feedback.textContent = '';

                const email = document.querySelector('#email').value.trim().toLowerCase();
                const password = document.querySelector('#password').value;
                const remember = document.querySelector('#remember').checked;

                if (!email || !password) { feedback.textContent = 'Ingresa email y contraseña'; return; }

                // Uso:
                const passHash = await registro.hashPassword(password);

                try {
                    // json-server: buscar usuario con email y password
                    const query = `http://localhost:8000/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(passHash)}`;
                    const res = await fetch(query);
                    if (!res.ok) { feedback.textContent = 'Error del servidor'; return; }
                    const users = await res.json();
                    if (!users || users.length === 0) { feedback.textContent = 'Email o contraseña incorrectos'; return; }

                    const user = users[0];
                    // Guardar sesión en localStorage (si remember, persistir también)
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    if (remember) localStorage.setItem('rememberUser', email);

                    if (user.role === 'admin') window.location.href = '../pages/dashboardAdmin.html';
                    else window.location.href = '../pages/dashboardCliente.html';
                } catch (err) {
                    feedback.textContent = 'No se pudo conectar con el servidor';
                }
            });

        }
            
        
    }


}