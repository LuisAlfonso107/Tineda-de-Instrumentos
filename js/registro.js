import { registroTemplate } from "../components/registro.template.js"
import { config } from "./config.js"
export const registro = {

    f() {
        let di = document.querySelector("#registro-section")
        const hashPassword = this.hashPassword;
        if (di) {

            di.innerHTML = registroTemplate.init()

            // NO BORRAR: Traduce el contenido nuevo del registro
            if (window.idioma) {
                window.idioma.translatePage();
            }

            const form = document.querySelector('#form-registro');
            const feedback = document.querySelector('#registro-feedback');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const nombre = document.querySelector('#nombre').value.trim();
                const apellido = document.querySelector('#apellido').value.trim();
                const email = document.querySelector('#email').value.trim().toLowerCase();
                const password = document.querySelector('#password').value;
                const confirm = document.querySelector('#confirm-password').value;
                const terms = document.querySelector('#terms').checked;

                feedback.textContent = '';

                if (!nombre || nombre.length < 2) { feedback.textContent = 'Nombre inválido'; return; }
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { feedback.textContent = 'Email inválido'; return; }
                if (!password || password.length < 6) { feedback.textContent = 'Contraseña muy corta'; return; }
                if (password !== confirm) { feedback.textContent = 'Las contraseñas no coinciden'; return; }
                if (!terms) { feedback.textContent = 'Debes aceptar los términos'; return; }

                 // Uso:
                const passHash = await hashPassword(password);

                try {
                    const existsUser = await fetch(`${config.endPoints().users}?email=${email}`);
                    
                    if (!existsUser.ok) {
                        feedback.textContent = 'Error registrando usuario';
                        return;
                    }

                    const userData = await existsUser.json();
                    if (userData.length > 0) {
                        feedback.textContent = 'Este email ya está registrado';
                        return;
                    }

                    const res = await fetch(`${config.endPoints().users}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: nombre + ' ' + apellido,
                            email: email,
                            password: passHash,
                            role: 'client',
                            isActive: true
                            //cliente: new Date().toISOString()
                        })
                    });

                    if (!res.ok) {
                        feedback.textContent = 'Error registrando usuario';
                        return;
                    }

                    const data = await res.json();
                    // Auto-login simple: guardar currentUser en localStorage
                    localStorage.setItem('currentUser', JSON.stringify(data));
                    window.location.href = '/index.html';
                } catch (err) {
                    feedback.textContent = 'No se pudo conectar con el servidor';
                }
            });
        }


    },
    async hashPassword(password) {
        // Convertir la contraseña a un array de bytes
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        // Calcular el hash usando SHA-256
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);

        // Convertir el buffer a una cadena hexadecimal
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        return hashHex;
    }


}