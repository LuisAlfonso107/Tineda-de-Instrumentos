// Modificación: Nuevo servidor Express con Multer para manejar uploads de imágenes y guardar en img/categoria/
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // Servir archivos estáticos desde el directorio padre

// Configurar Multer para guardar imágenes en img/categoria/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || 'general';
    const dir = path.join(__dirname, '..', 'img', category);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Datos en memoria (simulando data.json)
let data = {
  users: [],
  products: []
};

// Cargar datos iniciales si existe data.json
const dataPath = path.join(__dirname, 'data.json');
if (fs.existsSync(dataPath)) {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

// Función para guardar datos
const saveData = () => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Rutas
app.get('/users', (req, res) => {
  res.json(data.users);
});

app.get('/products', (req, res) => {
  res.json(data.products);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = data.users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

app.post('/products', upload.single('image'), (req, res) => {
  const { name, price, stock, category } = req.body;
  const imageUrl = req.file ? `img/${category}/${req.file.filename}` : '';

  const newProduct = {
    id: Date.now(),
    nombre: name,
    categoria: category,
    precio: parseFloat(price),
    descuento: 0,
    IVA: 21,
    stock: parseInt(stock),
    status: 'available',
    descripcion: 'Descripción por defecto',
    caracteristicas: {},
    imagenes: imageUrl ? [imageUrl] : []
  };

  data.products.push(newProduct);
  saveData();

  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});