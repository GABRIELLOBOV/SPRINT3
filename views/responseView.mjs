export function renderizarSuperHeroe (superheroe) 
{ 
    return { 
            Nombre: superheroe.nombreSuperHeroe, 
            "Nombre Real": superheroe.nombreReal, 
            Edad: superheroe.edad, 
            "Planeta de Origen": superheroe.planetaOrigen, 
            Debilidad: superheroe.debilidad, 
            poderes: superheroe.poderes, 
            Aliados: superheroe.aliados, 
            Enemigos: superheroe.enemigos 
           }; 
} 
    export function renderizarListaSuperHeroes (superheroes)
     { 
        return superheroes.map(superheroe => renderizarSuperHeroe (superheroe)); 
     }

     