import API from "./API";
import { BasePokemon, EnrichedPokemon } from '../models/interfaces/pokemonList';

const fetchAndEnrichPokemon = async (pokemon: BasePokemon): Promise<EnrichedPokemon | null> => {
    try {
        const response = await API.get(pokemon.url);
        const data = response.data;

        const id = data.id;
        const types = data.types.map((typeSlot: any) => typeSlot.type.name);
        const imageUrl = data.sprites.front_default;

        return {
            id: id,
            name: pokemon.name,
            imageUrl: imageUrl,
            types: types,
            detailUrl: pokemon.url,
        };
    } catch (error) {
        console.error(`Error fetching details for ${pokemon.name}:`, error);
        return null;
    }
};

export const fetchBasePokemonList = async (url: string) => {
    const listResponse = await API.get(url);

    if (listResponse.status >= 400 || !listResponse.data || listResponse.status === 204) {
        return {
            results: [],
            next: null,
        };
    }

    return {
        baseList: listResponse.data.results as BasePokemon[],
        next: listResponse.data.next as string | null,
    };
}

export const pokemonList = async (url: string = '/pokemon?limit=20') => {
    const { baseList, next } = await fetchBasePokemonList(url);

    if (!baseList) {
        return {
            results: [],
            next: null,
        };
    }

    const enrichedPromises = baseList.map(fetchAndEnrichPokemon);
    let enrichedList = await Promise.all(enrichedPromises);
    enrichedList = enrichedList.filter((p): p is EnrichedPokemon => p !== null);

    return {
        results: enrichedList,
        next: next,
    };
}