import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
    nombreSuperHeroe: { type: String, required: true }, 
    nombreReal: { type: String, required: true },       
    edad: { type: Number, min: 0, required: true },     
    planetaOrigen: { type: String, default: 'Desconocido' }, 
    poderes: { type: [String], required: true },        
    debilidad: { type: [String], required: true },      
    aliados: { type: [String], default: [] },           
    enemigos: { type: [String], default: [] },          
    creador: { type: [String], default: [] },           
}, {
    timestamps: true, 
    collection: 'Grupo-12', 
});

export default mongoose.model('SuperHero', superheroSchema);
