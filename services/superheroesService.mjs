
import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperHeroePorId(id) { 
    return await superHeroRepository.obtenerPorId(id);
} 
 
export async function obtenerTodosLosSuperHeroes() { 
   return await superHeroRepository.obtenerTodos (); 
} 


export async function buscarSuperHeroesPorPoderes(Poderes, valor) { 
    return await superHeroRepository.buscarPorPoderes (Poderes, valor); 
} 

export async function obtenerSuperHeroesMayoresDe30() { 
    return await superHeroRepository.obtenerMayoresDe30(); 
} 

export async function buscarSuperHeroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}
