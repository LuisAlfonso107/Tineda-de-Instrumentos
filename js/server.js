//const express = require('express');
/* 
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, '..', 'backend', 'data.json');

function readData() {
    try {
        const raw = fs.readFileSync(DATA_PATH, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        return { users: [], products: [], orders: [] };
    }
}

function writeData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// GET /users -> lista usuarios (sin passwords en la respuesta)
app.get('/users', (req, res) => {
    const data = readData();
    const users = data.users || [];
    const safe = users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role || 'client' }));
    res.json(safe);
});

// users -> registrar (espera { name, email, password })
app.post('/users', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Faltan campos' });

    const data = readData();
    data.users = data.users || [];

    if (data.users.find(u => (u.email || '').toLowerCase() === email.toLowerCase())) {
        return res.status(409).json({ success: false, message: 'Email ya registrado' });
    }

    const id = data.users.length ? Math.max(...data.users.map(u => u.id || 0)) + 1 : 1;
    const newUser = { id, name: name.trim(), email: email.toLowerCase().trim(), password, createdAt: new Date().toISOString(), role: 'client' };

    data.users.push(newUser);
    writeData(data);

    const safe = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    res.status(201).json(safe);
});

// login -> { email, password }
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Faltan campos' });

    const data = readData();
    const users = data.users || [];
    const user = users.find(u => (u.email || '').toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) return res.status(401).json({ success: false, message: 'Credenciales inválidas' });

    const safe = { id: user.id, name: user.name, email: user.email, role: user.role || 'client' };
    res.json(safe);
});

app.listen(PORT, () => console.log(`Servidor simple iniciado en http://localhost:${PORT}/users`));
*/