const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Función para cargar los datos del JSON (ahora en raíz)
function cargarDatosTemas() {
    try {
        const dataPath = path.join(__dirname, 'temas.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error al cargar los datos de temas:', error);
        return { temas: [] }; // Retorna estructura vacía si hay error
    }
}

// Endpoint para obtener todos los temas
app.get('/temas', (req, res) => {
    const datos = cargarDatosTemas();
    const temasResumen = datos.temas.map(tema => ({
        id: tema.id,
        nombre: tema.nombre,
        descripcion: tema.descripcion.substring(0, 100) + '...'
    }));
    res.json(temasResumen);
});

// Endpoint para obtener un tema específico
app.get('/tema/:id', (req, res) => {
    const datos = cargarDatosTemas();
    const temaId = parseInt(req.params.id);
    const tema = datos.temas.find(t => t.id === temaId);
    
    if (tema) {
        res.json(tema);
    } else {
        res.status(404).json({ error: 'Tema no encontrado' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});