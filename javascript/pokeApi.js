const container = document.getElementById('pokemon-container');
const loadMoreButton = document.getElementById('load-more');

// Variables para manejar la paginación
let inicial = 0;
const limite = 20;

async function fetchPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${inicial}&limit=${limite}`);
        const data = await response.json();
        const pokemonList = data.results;

        // recorre pokemonList para asi obtener sus detalles
        for (const pokemon of pokemonList) {
            const details = await fetch(pokemon.url).then(res => res.json());
            createCard(details);
        }

        // Incrementar el inicial  para la siguiente carga de Pokémon
        inicial += limite;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

// funcion que crea una carta
function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
    `;

    container.appendChild(card);
}


loadMoreButton.addEventListener('click', fetchPokemon);


fetchPokemon();
