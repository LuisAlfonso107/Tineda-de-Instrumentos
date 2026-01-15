// Sistema de Autenticación 

/* class AuthSystem {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users') || '[]');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    }

    register(name, email, password) {
        if (name.trim().length < 2) {
            return { success: false, message: 'El nombre debe tener al menos 2 caracteres' };
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { success: false, message: 'Email inválido' };
        }

        if (password.length < 6) {
            return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
        }

        if (this.users.find(u => u.email === email.toLowerCase())) {
            return { success: false, message: 'Este email ya está registrado' };
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: password,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));

        return { success: true, message: 'Usuario registrado exitosamente', user: newUser };
    }

    login(email, password) {
        const user = this.users.find(
            u => u.email === email.toLowerCase().trim() && u.password === password
        );

        if (!user) {
            return { success: false, message: 'Email o contraseña incorrectos' };
        }

        user.lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;

        return { success: true, message: 'Inicio de sesión exitoso', user: user };
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }
}

const auth = new AuthSystem();

function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const container = document.querySelector('.auth-container, .dashboard-container');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 5000);
}

function requireAuth() {
    if (!auth.isAuthenticated()) window.location.href = 'index.html';
}

function redirectIfAuthenticated() {
    if (auth.isAuthenticated()) window.location.href = 'index.html';
} */
