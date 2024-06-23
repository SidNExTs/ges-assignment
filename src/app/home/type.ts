import { Dispatch, SetStateAction } from "react";

export interface PokemonProps {
  name: string;
  url: string;
}

export interface PokemonTypesProps {
  name: string;
  url: string;
}

export interface PokemonFiltersProps {
  setType: Dispatch<SetStateAction<string | undefined>>;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}

export interface PokemonCardProps {
  pokemon: PokemonProps
}