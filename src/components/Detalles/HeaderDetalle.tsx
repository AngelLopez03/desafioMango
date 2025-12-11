import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'; 
import { headerProp } from '../../models/interfaces/pokemonDetails';

const HeaderDetalle: React.FC<headerProp> = ({ pokemonDetails }) => {
    const navigation = useNavigation();
    
    const { id, name, types, backDefault, frontDefault } = pokemonDetails;
    const [isFront, setIsFront] = useState(true);
    const rotation = useSharedValue(0);

    const handleFlip = () => {
        setIsFront(!isFront);
        rotation.value = withTiming(rotation.value + 180, { duration: 500 });
    };

    return (
        <View style={styles.container}>

            <View style={styles.titleName}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: '#fff', fontSize: 20 }}>Back</Text>
            </TouchableOpacity>
                <Text style={styles.pokemonName}>{name}</Text>
                <Text style={styles.pokemonId}>#{id?.toString().padStart(3, '0')}</Text>
            </View>

            <TouchableOpacity onPress={handleFlip}>
                <Animated.View style={[styles.imageWrapper]}>
                    <Image
                        source={{ uri: isFront ? frontDefault : backDefault }}
                        style={styles.pokemonImage}
                        resizeMode="contain"
                    />
                </Animated.View>
            </TouchableOpacity>

            <View style={styles.typeContainer}>
                {types.map(({type}) => (
                    <View key={type.name} style={[styles.pill, { backgroundColor: type.name === 'grass' ? '#7AC74C' : '#A33EA1' }]}>
                        <Text style={styles.pillText}>{type.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7AC74C',
        paddingTop: 50, 
        paddingBottom: 20,
        alignItems: 'center',
        boxShadow: '1px 1px 5px #777',
        zIndex: 1,
    },
    backButton: {
        zIndex: 10,
        padding: 5,
    },
    titleName: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    pokemonName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white'
    },
    pokemonId: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 15
    },
    imageWrapper: {
        height: 130,
        width: 130,
        marginVertical: 10
    },
    pokemonImage: { flex: 1 },
    typeContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    pill: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 5,
    },
    pillText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
});

export default HeaderDetalle;