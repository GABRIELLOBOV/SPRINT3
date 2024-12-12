import {
    obtenerSuperHeroePorId,
    obtenerTodosLosSuperHeroes,
    buscarSuperHeroesPorPoderes,
    obtenerSuperHeroesMayoresDe30,
    buscarSuperHeroesPorAtributo,
}                                     from '../services/superheroesService.mjs';


import { renderizarListaSuperHeroes } from '../views/responseView.mjs';




// Controlador para obtener todos los superhéroes
export const obtenerTodosLosSuperHeroesController = async (req, res) => {
    try {
        const superheroes = await obtenerTodosLosSuperHeroes();
        if (superheroes) {
            res.send(renderizarListaSuperHeroes(superheroes));
        } else {
            res.status(404).send({ mensaje: "Superhéroes no encontrados" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error en el servidor", error: error.message });
    }
};

// Renderizar el Dashboard
export const renderizarDashboard = async (req, res) => {
    try {
        const superheroes = await SuperHeroRepository.obtenerTodos();
        res.render('dashboard', { superheroes });
    } catch (error) {
        res.status(500).send({ mensaje: "Error al cargar el dashboard" });
    }
};

// Agregar un superhéroe
export const agregarSuperheroeController = async (req, res) => {
    try {
        const nuevoSuperheroe = req.body; // Asegúrate de que los datos lleguen correctamente
        await SuperHeroRepository.crear(nuevoSuperheroe); // Implementa este método en el repositorio
        res.redirect('/api/heroes'); // Redirige a la lista de superhéroes después de agregar
    } catch (error) {
        res.status(500).send({ mensaje: "Error al agregar superhéroe", error: error.message });
    }
};


// Editar un superhéroe
export const editarSuperheroeController = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;

    console.log("ID recibido:", id);
    console.log("Datos recibidos:", datosActualizados);

    try {
        const resultado = await SuperHeroRepository.actualizarPorId(id, datosActualizados);
        if (!resultado) {
            return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
        res.redirect('/api/heroes');
    } catch (error) {
        console.error("Error al actualizar:", error.message);
        res.status(500).send({ mensaje: "Error al editar superhéroe", error: error.message });
    }
};




// Eliminar un superhéroe
export const eliminarSuperheroeController = async (req, res) => {
    const { id } = req.params;
    try {
        await SuperHeroRepository.borrarPorId(id);
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).send({ mensaje: "Error al eliminar superhéroe", error: error.message });
    }
};

// Obtener superhéroe por ID
export const obtenerSuperheroePorIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const superheroe = await obtenerSuperHeroePorId(id);
        if (!superheroe) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }
        res.status(200).json(superheroe);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener superhéroe", error: error.message });
    }
};

// Buscar superhéroes por atributo
export const buscarSuperHeroesPorAtributoController = async (req, res) => {
    const { atributo } = req.params;
    const { valor } = req.query;

    if (!valor) {
        return res.status(400).json({ mensaje: "Se requiere un valor para buscar" });
    }

    try {
        const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
        res.status(200).json(superheroes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar superhéroes", error: error.message });
    }
};

// Buscar superhéroes por poderes
export const buscarSuperHeroesPorPoderesController = async (req, res) => {
    const { poderes } = req.params;
    const { valor } = req.query;

    if (!valor) {
        return res.status(400).send({ mensaje: "Falta el valor para la búsqueda" });
    }

    try {
        const superheroes = await buscarSuperHeroesPorPoderes(poderes, valor);
        if (superheroes.length > 0) {
            res.send(renderizarListaSuperHeroes(superheroes));
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error en el servidor", error: error.message });
    }
};

// Superhéroes mayores de 30 años
export const obtenerSuperHeroesMayoresDe30Controller = async (req, res) => {
    try {
        const superheroes = await obtenerSuperHeroesMayoresDe30();
        if (superheroes.length > 0) {
            res.send(renderizarListaSuperHeroes(superheroes));
        } else {
            res.status(404).send({ mensaje: "Superhéroes no encontrados" });
        }
    } catch (error) {
        res.status(500).send({ mensaje: "Error en el servidor", error: error.message });
    }
};
