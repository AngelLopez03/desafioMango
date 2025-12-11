import { useEffect, useCallback, useState, useMemo } from "react"; 
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getPokemonList } from "../../actions/PokemonList.action";
import PokemonCard from "../../components/PokemonCard";
import { EnrichedPokemon } from "../../models/interfaces/pokemonList";
import { useNavigation } from "@react-navigation/native";

const Inicio = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();
    
    const [searchQuery, setSearchQuery] = useState(''); 
    
    const [isSearching, setIsSearching] = useState(false); 
    
    const { list: pokeData, isLoading } = useSelector((state: RootState) => state.pokemonList);

    const pokeList = pokeData?.results || [];
    const nextUrl = pokeData?.next;

    useEffect(() => {
        if (pokeList.length === 0) {
            dispatch(getPokemonList());
        }
    }, [dispatch, pokeList.length]);

    const handleLoadMore = useCallback(() => {
        if (nextUrl && !isLoading && searchQuery.length === 0) { 
            dispatch(getPokemonList(nextUrl));
        }
    }, [dispatch, nextUrl, isLoading, searchQuery.length]);

    const handlePressCard = useCallback((pokemon: EnrichedPokemon) => {
        navigation.navigate('Detalles', {
            pokemonId: pokemon.id,
            pokemonName: pokemon.name,
        });
    }, [navigation]);
    
    const filteredPokemonList = useMemo(() => {
        if (!searchQuery) {
            return pokeList;
        }

        const lowerCaseQuery = searchQuery.toLowerCase();
        
        return pokeList.filter(pokemon => 
            pokemon.name.toLowerCase().includes(lowerCaseQuery)
        );
    }, [pokeList, searchQuery]);
    
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        
        if (searchQuery.length > 0 && filteredPokemonList.length === 0) {
        
            if (nextUrl && !isLoading) {
                if (!isSearching) {
                    setIsSearching(true);
                    dispatch(getPokemonList(nextUrl)).finally(() => {
                         setIsSearching(false);
                    });
                }
            }
        }
    }, [searchQuery, filteredPokemonList.length, nextUrl, isLoading, dispatch, isSearching]);

    const renderPokemonCard = useCallback(({ item }: { item: EnrichedPokemon }) => (
        <PokemonCard 
            pokemon={item} 
            onPress={handlePressCard as (pokemon: any) => void} 
        />
    ), [handlePressCard]);
    
    const keyExtractor = useCallback((item: EnrichedPokemon, index: number) => item.id ? item.id.toString() : index.toString(), []);

    const isCurrentlyFetching = isLoading || isSearching;
    
    if (isCurrentlyFetching && pokeList.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF0000" />
                <Text style={{ marginTop: 10 }}>Cargando lista de Pokémon...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.listHeader}>Pokémon List</Text>
            
            <View style={styles.searchBarContainer}>
                 <Text style={{ fontSize: 18, marginRight: 10 }}>🔍</Text> 
                 <TextInput
                    style={styles.searchInput}
                    placeholder="Search Pokémon..."
                    placeholderTextColor="#aaa"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    keyboardType="default"
                    autoCapitalize="none"
                 />
            </View>

            <FlatList
                data={filteredPokemonList} 
                renderItem={renderPokemonCard}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    isCurrentlyFetching && filteredPokemonList.length === 0 ? (
                        <ActivityIndicator size="small" color="#0000ff" style={{ marginVertical: 15 }} />
                    ) : (
                        filteredPokemonList.length === 0 && searchQuery.length > 0 && !nextUrl ? (
                            <Text style={styles.noResultsText}>No se encontraron más Pokémon con ese nombre.</Text>
                        ) : null
                    )
                }
            />
        </View>
    );
}

export default Inicio;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingHorizontal: 15,
        paddingTop: 50,
        color: '#333',
    },
    searchBarContainer: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    searchInput: {
        flex: 1, 
        fontSize: 16,
        color: '#333',
        paddingVertical: 0, 
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
    },
});