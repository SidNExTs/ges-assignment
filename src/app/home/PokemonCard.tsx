/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { PokemonCardProps } from "./type";
import { fetchPokemon } from "./action";

function PokemonCard({ pokemon }: PokemonCardProps) {
  const [pokemonDetail, setPokemonDetail] = useState<any>();
  const handleFetchPokemonDetail = async () => {
    const pokemonDetail = await fetchPokemon(pokemon.url);
    setPokemonDetail(pokemonDetail);
  };

  useEffect(() => {
    handleFetchPokemonDetail();
  }, []);

  return (
    <>
      <div className="group relative p-4 border-solid border-gray-400">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
          <img
            src={
              pokemonDetail?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt={pokemonDetail?.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={`/pokemon/${pokemonDetail?.id}`}>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 border-grey-500"
                />
                {pokemon.name}
              </a>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
