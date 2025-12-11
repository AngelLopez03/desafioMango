import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../slice/pokemonList.slice";
import pokemonDetailsReducer from "../slice/pokemonDetails.slice";

export const store = configureStore({
    reducer: {
        pokemonList: pokemonReducer,
        pokemonDetails: pokemonDetailsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;