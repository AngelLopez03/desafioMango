
import React from 'react';
import { TouchableOpacity, Text, Image, View, StyleSheet } from 'react-native';

interface PokemonListItem {
  name: string;
  url: string;
  id: number;
  imageUrl: string; 
  types: string[]; 
}

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onPress: (pokemon: PokemonListItem) => void;
}

const getTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
        case 'grass': return '#7AC74C';
        case 'fire': return '#EE8130';
        case 'water': return '#6390F0';
        case 'bug': return '#A6B91A';
        case 'normal': return '#A8A77A';
        case 'poison': return '#A33EA1';
        case 'electric': return '#F7D02C';
        case 'ground': return '#E2BF65';
        case 'fairy': return '#D685AD';
        case 'fighting': return '#C22E28';
        case 'psychic': return '#F95587';
        case 'rock': return '#B6A136';
        case 'ghost': return '#735797';
        case 'ice': return '#96D9D6';
        case 'dragon': return '#6F35FC';
        case 'steel': return '#B7B7CE';
        case 'dark': return '#705746';
        case 'flying': return '#A98FF3';
        default: return '#68A090';
    }
};

interface PokemonCardProps {
  pokemon: PokemonListItem;
  onPress: (pokemon: PokemonListItem) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = React.memo(({ pokemon, onPress }) => {
  const defaultImage = require('../../assets/pokeball.png');

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(pokemon)}>
      <Image
        style={styles.pokemonImage}
        source={pokemon.imageUrl ? { uri: pokemon.imageUrl } : defaultImage}
        defaultSource={defaultImage}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.pokemonName}>{pokemon.name}</Text>
        <View style={styles.pokemonTypesContainer}>
          {pokemon.types.map((type, index) => (
            <Text 
              key={index} 
              style={[
                styles.typePill,
                { backgroundColor: getTypeColor(type) } 
              ]}
            >
              {type}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    margin: 8,
    marginHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  pokemonImage: {
    width: 90,
    height: 90,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  pokemonTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typePill: {
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 5,
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
});

export default PokemonCard;