'use server';

export async function fetchPokemon(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  const data = await response.json();

  if (data === 'Not Found') {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data;
}