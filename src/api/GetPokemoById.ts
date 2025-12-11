import API from "./API";
import { PokemonDetails } from '../models/interfaces/pokemonDetails';

const fetchPokemonSpeciesData = async (pokemonId: number) => {
    const speciesRes = await API.get(`/pokemon-species/${pokemonId}`);

    const flavorTextEntry = speciesRes.data.flavor_text_entries.find((entry: any) =>
        entry.language.name === 'es' || entry.language.name === 'en'
    );

    return {
        flavorText: flavorTextEntry ? flavorTextEntry.flavor_text.replace(/(\r\n|\n|\r)/gm, " ") : "Descripción no disponible.",
        evolutionChainUrl: speciesRes.data.evolution_chain.url,
    };
};

export const fetchFullPokemonDetails = async (pokemonId: number): Promise<PokemonDetails> => {
    const pokemonUrl = `/pokemon/${pokemonId}`;
    const [pokemonRes, speciesData] = await Promise.all([
        API.get(pokemonUrl),
        fetchPokemonSpeciesData(pokemonId)
    ]);

    const pokemonData = pokemonRes.data;

    const officialArtwork = pokemonData.sprites.other['official-artwork'].front_default;

    const frontDefault = pokemonData.sprites.other.showdown.front_default;
    const backDefault = pokemonData.sprites.other.showdown.back_default;

    console.log('habilidades: ', pokemonData.abilities);
    
    const abilities = pokemonData.abilities;

    return {
        id: pokemonData.id,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types,
        stats: pokemonData.stats,
        officialArtwork: officialArtwork,
        frontDefault,
        backDefault,
        abilities,
        flavorText: speciesData.flavorText,
        evolutionChainUrl: speciesData.evolutionChainUrl,
    };
};