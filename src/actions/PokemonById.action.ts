import { AppDispatch, RootState } from "../store/store";
import { startLoadingDetails, setDetails, setErrorDetails } from '../slice/pokemonDetails.slice';
import { fetchFullPokemonDetails } from '../api/GetPokemoById';

export const getPokemonDetails = (pokemonId: number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const state = getState().pokemonDetails;

        if (state.cache[pokemonId]) {
            console.log(`Detalles del Pokémon ID ${pokemonId} encontrados en caché. No es necesario hacer fetch.`);
            return;
        }

        if (state.isLoading) return; 
        dispatch(startLoadingDetails());

        try {
            const details = await fetchFullPokemonDetails(pokemonId);
            dispatch(setDetails(details));

        } catch (error) {
            console.error(`Error al obtener detalles del Pokémon ID ${pokemonId}:`, error);
            const errorMessage = error instanceof Error ? error.message : "Fallo al obtener detalles del Pokémon.";
            dispatch(setErrorDetails(errorMessage));
        }
    };
}