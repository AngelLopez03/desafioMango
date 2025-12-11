export interface PokemonTypeSlot {
    slot: number;
    type: PokemonGenericR;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: PokemonGenericR;
}

interface PokemonGenericR {
    name: string;
    url: string;
}

export interface headerProp {
    pokemonDetails: PokemonDetails;
}


export interface PokemonDetails {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: PokemonTypeSlot[];
    stats: PokemonStat[];
    frontDefault: string;
    backDefault: string;
    abilities: Ability[];
    officialArtwork: string;
    flavorText: string;
    evolutionChainUrl: string;
}

interface Ability {
    ability: PokemonGenericR;
    is_hidden: boolean;
    slot: number;
}


export interface DetailsState {
    cache: { [id: number]: PokemonDetails };
    isLoading: boolean;
    error: string | null;
}