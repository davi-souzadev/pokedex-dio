const pokeApi = {}

function convertPokeApiDetailsToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.id = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.img = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = pokemon => {
  return fetch(pokemon.url)
          .then(response => response.json())
          .then(convertPokeApiDetailsToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonDetails => pokemonDetails)
}