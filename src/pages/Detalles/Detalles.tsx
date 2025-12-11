import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getPokemonDetails } from '../../actions/PokemonById.action';
import { PokemonDetails } from '../../models/interfaces/pokemonDetails';
import HeaderDetalle from '../../components/Detalles/HeaderDetalle';
import BodyDetalle from '../../components/Detalles/BodyDetalle';

type DetailsRouteParams = {
    pokemonId: number;
    pokemonName: string;
};

const Detalles = () => {
    const route = useRoute();
    const dispatch = useDispatch<AppDispatch>();
    const { cache, isLoading, error } = useSelector((state: RootState) => state.pokemonDetails);
    
    const { pokemonId, pokemonName } = route.params as DetailsRouteParams;
    const pokemonDetails: PokemonDetails | undefined = cache[pokemonId];
    
    useEffect(() => {
        dispatch(getPokemonDetails(pokemonId));
    }, [dispatch, pokemonId]);

    if (!pokemonDetails) {
        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Cargando detalles de {pokemonName}...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Error al cargar los detalles:</Text>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        return (
            <View style={styles.loadingContainer}>
                <Text>Detalles no encontrados.</Text>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <HeaderDetalle pokemonDetails={pokemonDetails} /> 
            
            <BodyDetalle pokemonDetails={pokemonDetails} /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    loadingText: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
    footerText: {
        position: 'absolute', 
        bottom: 10, 
        alignSelf: 'center', 
        paddingHorizontal: 20,
        fontSize: 10,
        color: '#888',
    }
});

export default Detalles;