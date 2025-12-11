export interface BasePokemon {
    name: string;
    url: string;
}

export interface EnrichedPokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
    detailUrl: string;
}