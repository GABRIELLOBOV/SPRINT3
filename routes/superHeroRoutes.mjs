import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperHeroesController, // Nombre corregido
    buscarSuperHeroesPorPoderesController,
    obtenerSuperHeroesMayoresDe30Controller,
    buscarSuperHeroesPorAtributoController,
    agregarSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
} from '../controllers/superheroesController.mjs';

import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

const router = express.Router();

// Rutas específicas
router.get('/heroes/mayores-30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/buscar/:poderes', buscarSuperHeroesPorPoderesController);
router.get('/heroes/buscar/atributo/:atributo', buscarSuperHeroesPorAtributoController);
router.get('/heroes/', obtenerTodosLosSuperHeroesController);
router.get('/heroes/buscar/:id', obtenerSuperheroePorIdController);

// Renderiza el formulario para agregar un superhéroe
router.get('/heroes/agregar', (req, res) => {
    res.render('addSuperhero'); // Asegúrate de que addSuperhero.ejs exista en src/views
});

// Renderiza el formulario para editar un superhéroe
router.get('/heroes/editar/:id', async (req, res) => {
    try {
        const superheroe = await SuperHeroRepository.obtenerPorId(req.params.id); // Asegúrate de que este método funcione correctamente
        if (!superheroe) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        res.render('editSuperhero', { superheroe }); // Asegúrate de que editSuperhero.ejs exista en src/views
    } catch (error) {
        res.status(500).send({ mensaje: "Error al cargar el formulario de edición", error: error.message });
    }
});
// Ruta para agregar un superhéroe
router.post('/heroes', agregarSuperheroeController); // Asegúrate de que este controlador esté implementado

// Ruta para editar un superhéroe
router.put('/heroes/:id', editarSuperheroeController); // Requiere method-override para soportar PUT en formularios

// Ruta para eliminar un superhéroe
router.delete('/heroes/:id', eliminarSuperheroeController);

export default router;
