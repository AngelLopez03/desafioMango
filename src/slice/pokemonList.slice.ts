import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EnrichedPokemon } from '../models/interfaces/pokemonList';


interface PokemonState {
    list: {
        results: EnrichedPokemon[];
        next: string | null;
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    list: {
        results: [],
        next: null,
    },
    isLoading: false,
    error: null,
};

const pokemonListSlice = createSlice({
    name: 'pokemonList',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setPokemonList: (state, action: PayloadAction<{ results: EnrichedPokemon[], next: string | null }>) => {
            state.isLoading = false;
            state.list.results = [...state.list.results, ...action.payload.results];
            state.list.next = action.payload.next;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { startLoading, setPokemonList, setError } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;