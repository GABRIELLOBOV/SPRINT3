import express from 'express'; 
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs'; 
import { fileURLToPath } from 'url';
import path from 'path'; 
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Configuración de motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Servir archivos estáticos desde 

app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(methodOverride('_method')); 
app.use(express.urlencoded({ extended: true })); // Para manejar formularios
app.use(express.json()); //Middleware Para manejar JSON

// Conexión a MongoDB 
connectDB(); 

// Configuración de rutas 
app.use('/api', superHeroRoutes); 

// Manejo de errores para rutas no encontradas 
app.use((req, res) => {
    res.status(404).render('error404', { mensaje: "Ruta no encontrada" });
});

// Iniciar el servidor 
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
});

