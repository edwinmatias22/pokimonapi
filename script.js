document.addEventListener('DOMContentLoaded', () => {
    const pokemonInput = document.getElementById('pokemonInput');
    const searchButton = document.getElementById('searchButton');
    const pokemonContainer = document.getElementById('pokemonContainer');

    searchButton.addEventListener('click', searchPokemon);
    pokemonInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPokemon();
        }
    });

    async function searchPokemon() {
        const searchTerm = pokemonInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            showError('Please enter a Pokémon name or ID');
            return;
        }

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
            
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            
            const pokemonData = await response.json();
            displayPokemon(pokemonData);
            
        } catch (error) {
            showError(error.message);
        }
    }

    function displayPokemon(pokemon) {
        // Capitalize the first letter of the name
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        
        // Get the official artwork image or fallback to another image
        const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                         pokemon.sprites.front_default;
        
        pokemonContainer.innerHTML = `
            <h2>${name}</h2>
            <img class="pokemon-image" src="${imageUrl}" alt="${name}">
        `;
    }

    function showError(message) {
        pokemonContainer.innerHTML = `<p class="error">${message}</p>`;
    }
});