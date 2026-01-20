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

// GET /products -> lista productos
app.get('/products', (req, res) => {
    const data = readData();
    const products = data.products || [];
    res.json(products);
});

// POST /products -> agregar producto (espera { nombre, categoria, precio, descuento, IVA, stock, status, descripcion, caracteristicas, imagenes })
app.post('/products', (req, res) => {
    const { nombre, categoria, precio, descuento, IVA, stock, status, descripcion, caracteristicas, imagenes } = req.body;
    if (!nombre || !categoria || precio === undefined || IVA === undefined || stock === undefined || !descripcion || !caracteristicas || !imagenes) {
        return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }

    const data = readData();
    data.products = data.products || [];

    const id = data.products.length ? Math.max(...data.products.map(p => p.id || 0)) + 1 : 1;
    const newProduct = {
        id,
        nombre: nombre.trim(),
        categoria: categoria.trim(),
        precio: parseFloat(precio),
        descuento: parseFloat(descuento) || 0,
        IVA: parseInt(IVA),
        stock: parseInt(stock),
        status: status || 'available',
        descripcion: descripcion.trim(),
        caracteristicas,
        imagenes: Array.isArray(imagenes) ? imagenes : []
    };

    data.products.push(newProduct);
    writeData(data);

    res.status(201).json({ success: true, product: newProduct });
});

app.listen(PORT, () => console.log(`Servidor simple iniciado en http://localhost:${PORT}/users`));
*/