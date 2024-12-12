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
app.set('views', path.join(__dirname, 'views')); // Asegúrate de que las vistas están en src/views

// Middleware para parsear JSON 
app.use(express.json()); 

// Servir archivos estáticos desde 
app.use(express.static(path.join(process.cwd(), 'src', 'public')));
app.use(methodOverride('_method')); // Para que los métodos PUT y DELETE funcionen correctamente

// Conexión a MongoDB 
connectDB(); 

// Configuración de rutas 
app.use('/api', superHeroRoutes); 

// Manejo de errores para rutas no encontradas 
app.use((req, res) => {
    res.status(404).render('error404', { mensaje: "Ruta no encontrada" });
});

// Interpreta "_method" como PUT o DELETE
app.use(methodOverride('_method')); 


// Iniciar el servidor 
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
});


