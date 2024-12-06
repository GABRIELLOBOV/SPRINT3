import express from 'express'; 
import {connectDB} from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs'; 
 

const app = express(); 
const PORT = process.env.PORT || 3000; 

// Middleware para parsear JSON 
app.use(express.json()); 

// Conexión a MongoDB 
connectDB(); 

// Configuración de rutas 
app.use('/api', superHeroRoutes); 

// Manejo de errores para rutas no encontradas 
app.use((req, res) => {
    res.status(404).render('error404', { mensaje: "Ruta no encontrada" });
});
import path from 'path';


// Configuración de motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));

 
// Iniciar el servidor 
app.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${PORT}`); 
}); 



