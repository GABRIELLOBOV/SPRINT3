import express from 'express';
import {
    obtenerSuperheroePorIdController,
    obtenerTodosLosSuperHeroesController,
    buscarSuperHeroesPorPoderesController,
    obtenerSuperHeroesMayoresDe30Controller,
    buscarSuperHeroesPorAtributoController,
    agregarSuperheroeController,
    editarSuperheroeController,
    eliminarSuperheroeController,
} from '../controllers/superheroesController.mjs';
import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

const router = express.Router();

// Ruta para obtener superhéroes mayores de 30
router.get('/heroes/mayores-30', obtenerSuperHeroesMayoresDe30Controller);

// Ruta para buscar superhéroes por poderes
router.get('/heroes/buscar/:poderes', buscarSuperHeroesPorPoderesController);

// Ruta para buscar superhéroes por atributo
router.get('/heroes/buscar/atributo/:atributo', buscarSuperHeroesPorAtributoController);

// Ruta para listar todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController);

// Ruta para obtener un superhéroe por ID
router.get('/heroes/:id', obtenerSuperheroePorIdController);

// Renderizar el formulario para agregar un superhéroe
router.get('/heroes/agregar', (req, res) => {
    res.render('addSuperhero');
});

// Renderizar el formulario para editar un superhéroe
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

// Ruta para agregar un superhéroe (POST)
router.post('/heroes', agregarSuperheroeController);

// Ruta para editar un superhéroe (PUT)
router.put('/heroes/:id', editarSuperheroeController);

// Ruta para eliminar un superhéroe
router.delete('/heroes/:id', eliminarSuperheroeController);

export default router;
