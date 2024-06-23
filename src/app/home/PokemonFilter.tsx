"use client";
import { useEffect, useRef, useState } from "react";
import { fetchPokemonTypes } from "./action";
import { PokemonFiltersProps, PokemonTypesProps } from "./type";

function PokemonFilter({ setType, setSearch }: PokemonFiltersProps) {
  const typeRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [pokemonTypes, setPokemonTypes] = useState<
    PokemonTypesProps[] | undefined
  >();

  const handleFetchPokemonTypes = async () => {
    const pokemonTypes = await fetchPokemonTypes();
    setPokemonTypes(pokemonTypes);
  };

  useEffect(() => {
    handleFetchPokemonTypes();
  }, []);

  return (
    <>
      <h2 className="text-base font-semibold leading-7 text-indigo-600">
        Filter
      </h2>
      <div className="flex">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Your Email
        </label>
        <select
          ref={typeRef}
          id="pokemonType"
          name="pokemonType"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 w-44"
        >
          <option value={""}>All</option>
          {pokemonTypes?.map((pokemonType: PokemonTypesProps) => (
            <option key={pokemonType.name} value={pokemonType.name}>
              {pokemonType.name}
            </option>
          ))}
        </select>
        <div className="relative w-full">
          <input
            ref={searchRef}
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              setType(typeRef?.current?.value);
              setSearch(searchRef?.current?.value);
            }}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default PokemonFilter;
