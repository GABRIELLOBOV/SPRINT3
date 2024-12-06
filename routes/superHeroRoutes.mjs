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

// Formularios
router.get('/heroes/agregar', (req, res) => res.render('addSuperhero'));
router.get('/heroes/editar/:id', async (req, res) => {
    try {
        const superheroe = await SuperHeroRepository.obtenerPorId(req.params.id);
        if (!superheroe) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        res.render('editSuperhero', { superheroe });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al cargar el formulario de edición", error: error.message });
    }
});

// Operaciones CRUD
router.post('/heroes', agregarSuperheroeController);
router.put('/heroes/:id', editarSuperheroeController);
router.delete('/heroes/:id', eliminarSuperheroeController);

export default router;
