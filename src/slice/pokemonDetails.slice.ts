import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailsState, PokemonDetails } from '../models/interfaces/pokemonDetails';

const initialState: DetailsState = {
    cache: {},
    isLoading: false,
    error: null,
};

const pokemonDetailsSlice = createSlice({
    name: 'pokemonDetails',
    initialState,
    reducers: {
        startLoadingDetails: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setDetails: (state, action: PayloadAction<PokemonDetails>) => {
            state.isLoading = false;
            state.cache[action.payload.id] = action.payload;
        },
        setErrorDetails: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { startLoadingDetails, setDetails, setErrorDetails } = pokemonDetailsSlice.actions;
export default pokemonDetailsSlice.reducer;