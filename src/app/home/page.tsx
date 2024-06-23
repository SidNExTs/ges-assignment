"use client";
import { useEffect, useState } from "react";

import { PokemonProps } from "./type";
import { fetchPokemonList } from "./action";

import PokemonFilter from "./PokemonFilter";
import PokemonCard from "./PokemonCard";

function Home() {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>(null);
  const [type, setType] = useState<string | undefined>("");
  const [search, setSearch] = useState<string | undefined>("");

  const limit = 12;
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  async function handleFetchPokemonList() {
    const pokemonListResponse = await fetchPokemonList(
      limit,
      current * limit,
      type,
      search
    );
    setPokemons(pokemonListResponse.results);
    setCount(pokemonListResponse.count);
  }

  useEffect(() => {
    handleFetchPokemonList();
  }, []);

  useEffect(() => {
    handleFetchPokemonList();
  }, [current, type, search]);

  return (
    <>
      <div className="bg-white py-12 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PokemonFilter
              setType={setType}
              setSearch={(v) => {
                setCurrent(0);
                setSearch(v);
              }}
            />
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
              {pokemons?.map((pokemon: PokemonProps) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center mt-12">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {current + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {Math.ceil(count / limit)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {count}
              </span>{" "}
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
              <button
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setCurrent(Number(current - 1))}
                disabled={current === 0}
              >
                <svg
                  className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <button
                className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => setCurrent(Number(current + 1))}
                disabled={current == Math.ceil(count / limit) - 1}
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
