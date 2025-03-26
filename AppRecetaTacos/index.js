import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Configuración de __dirname para módulos ES
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const recetaJSON = `
[
    {
        "id": "0001",
        "tipo": "taco",
        "nombre": "Taco lechon",
        "precio": 20.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Puerco",
                "preparacion": "Horneado"
            },
            "salsa": {
                "nombre": "Tomate verde",
                "picor": "Medio"
            },
            "acompañamientos": [
                {
                    "nombre": "Cebolla",
                    "cantidad": "1 cucharada",
                    "ingredientes": [
                        "Cebolla blanca",
                        "Cilantro",
                        "Naranja",
                        "Sal"
                    ]
                },
                {
                    "nombre": "Guacamole",
                    "cantidad": "2 cucharadas",
                    "ingredientes": [
                        "Aguacate",
                        "Jugo de limon",
                        "Sal",
                        "Cebolla",
                        "Cilantro"
                    ]
                }
            ]
        }
    },
    {
        "id": "0002",
        "tipo": "taco",
        "nombre": "Taco al pastor",
        "precio": 22.50,
        "ingredientes": {
            "proteina": {
                "nombre": "Cerdo adobado",
                "preparacion": "Asado en trompo"
            },
            "salsa": {
                "nombre": "Salsa roja",
                "picor": "Alto"
            },
            "acompañamientos": [
                {
                    "nombre": "Piña",
                    "cantidad": "3 trozos",
                    "ingredientes": ["Piña natural"]
                },
                {
                    "nombre": "Cebolla y cilantro",
                    "cantidad": "1 cucharada",
                    "ingredientes": ["Cebolla morada", "Cilantro", "Limón"]
                }
            ]
        }
    },
    {
        "id": "0003",
        "tipo": "taco",
        "nombre": "Taco de barbacoa",
        "precio": 25.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Carne de borrego",
                "preparacion": "Cocido en hoyo"
            },
            "salsa": {
                "nombre": "Salsa borracha",
                "picor": "Bajo"
            },
            "acompañamientos": [
                {
                    "nombre": "Consomé",
                    "cantidad": "1 taza",
                    "ingredientes": ["Caldo de barbacoa", "Cebolla", "Cilantro", "Limón"]
                },
                {
                    "nombre": "Cebolla curtida",
                    "cantidad": "1 cucharada",
                    "ingredientes": ["Cebolla blanca", "Vinagre", "Orégano"]
                }
            ]
        }
    },
    {
        "id": "0004",
        "tipo": "taco",
        "nombre": "Taco de pescado",
        "precio": 28.00,
        "ingredientes": {
            "proteina": {
                "nombre": "Filete de pescado",
                "preparacion": "Empanizado y frito"
            },
            "salsa": {
                "nombre": "Salsa de chipotle",
                "picor": "Medio"
            },
            "acompañamientos": [
                {
                    "nombre": "Repollo",
                    "cantidad": "1/2 taza",
                    "ingredientes": ["Repollo morado", "Mayonesa", "Crema"]
                },
                {
                    "nombre": "Pico de gallo",
                    "cantidad": "2 cucharadas",
                    "ingredientes": ["Jitomate", "Cebolla", "Cilantro", "Limón"]
                }
            ]
        }
    }
]
`;

const recetasTacos = JSON.parse(recetaJSON);

// Middleware para analizar datos del formulario usando body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

//GET para obtener receta de taco especifico
app.get('/receta/:busqueda', (req, res) => {
    const busqueda = req.params.busqueda.toLowerCase();

    const elegirTaco = recetasTacos.find(taco =>
        taco.id.toLowerCase() === busqueda ||
        taco.nombre.toLowerCase().includes(busqueda) ||
        (taco.ingredientes.proteina && taco.ingredientes.proteina.nombre.toLowerCase().includes(busqueda))
    );

    res.json(elegirTaco || { error: "Receta no encontrada" });
});

//Nueva ruta para obtener todas las recetas
app.get('/recetas', (req, res) => {
    res.json(recetasTacos);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});