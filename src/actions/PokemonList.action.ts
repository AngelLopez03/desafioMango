import { pokemonList } from "../api/GetPokemonList";
import { setError, setPokemonList, startLoading } from "../slice/pokemonList.slice";
import { AppDispatch, RootState } from "../store/store";

export const getPokemonList = (url?: string) => { 
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (getState().pokemonList.isLoading) {
            return;
        }

        dispatch(startLoading());

        try {
            const data = await pokemonList(url); 

            if (data) {
                dispatch(setPokemonList(data));
            } else {
                dispatch(setError("La lista de Pokémon está vacía o tiene un formato incorrecto."));
            }
        } catch (error) {
            console.error("Error al obtener la lista de Pokémon:", error);
            const errorMessage = error instanceof Error ? error.message : "Fallo en la conexión al servidor.";
            dispatch(setError(errorMessage));
        }
    };
}