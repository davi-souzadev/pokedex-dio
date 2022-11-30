const pokemonUL = document.querySelector('#pokemon-list')
const loadButton = document.querySelector('#loadMore')
const limit = 10
let offset = 0
const maxRecords = 151

function loadPokemonItens(offset, limit) {
  function convertPokemon(pokemon) {
    return `
      <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.id}</span>
        <span class="name" >${pokemon.name}</span>
  
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>
  
          <img 
            src="${pokemon.img}" 
            alt="${pokemon.name}"
          >
        </div>
      </li>
    `
  }

  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const pokemonHtml = pokemons.map(convertPokemon).join('')
      pokemonUL.innerHTML += pokemonHtml
    })
}

loadPokemonItens(offset, limit)

loadButton.addEventListener('click', () => {
  offset += limit
  
  const recordQuantity = offset + limit

  if(recordQuantity >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    loadButton.parentElement.removeChild(loadButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})