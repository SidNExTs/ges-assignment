'use server';

export async function fetchPokemonTypes() {
  const response = await fetch('https://pokeapi.co/api/v2/type');

  const data = await response.json();

  if (data === 'Not Found') {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data.results;
}

export async function fetchPokemonList(limit: number, offset: number, type: string = "", search: string | undefined = "") {
  let data: any = '';
  if (type === "") {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${search === "" ? limit : 10000}`);

    data = await response.json();
  } else {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    data = await response.json();
    data = { count: data?.pokemon?.length, results: limitOffset(data?.pokemon?.map((p: any) => p.pokemon), limit, offset) };
  }

  if (search !== "") {
    let filterData = data.results.filter((r: any) => r.name.search(search) > -1);
    data = { count: filterData.length, results: limitOffset(filterData, limit, offset) };
  }

  if (data === 'Not Found') {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data;
}

export async function fetchPokemon(url: string) {
  const response = await fetch(url);

  const data = await response.json();

  if (data === 'Not Found') {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return data;
}

function limitOffset<T>(array: T[], limit: number, offset: number): T[] {
  if (!array) return [];

  const length = array.length;

  if (!length) {
    return [];
  }
  if (offset > length - 1) {
    return [];
  }

  const start = Math.min(length - 1, offset);
  const end = Math.min(length, offset + limit);

  return array.slice(start, end);
}