import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PokemonStat } from '../../models/interfaces/pokemonDetails';

interface StatsChartProps {
    stats: PokemonStat[];
}

const MAX_STAT_VALUE = 255; 

const formatStatName = (name: string): string => {
    switch (name) {
        case 'special-attack': return 'Sp. Atk';
        case 'special-defense': return 'Sp. Def';
        case 'hp': return 'HP';
        default: return name.charAt(0).toUpperCase() + name.slice(1);
    }
};

const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
    return (
        <View style={chartStyles.container}>
            <Text style={chartStyles.header}>Base Stats</Text>
            {stats.map((statItem) => {
                const statName = formatStatName(statItem.stat.name);
                const statValue = statItem.base_stat;
                const barWidth = `${(statValue / MAX_STAT_VALUE) * 100}%`;
                
                const barColor = statValue > 100 ? '#7AC74C' : (statValue > 70 ? '#FFC300' : '#FF5733');

                return (
                    <View key={statItem.stat.name} style={chartStyles.statRow}>
                        <Text style={chartStyles.statName}>{statName}</Text>
                        
                        <Text style={chartStyles.statValue}>{statValue.toString().padStart(3, '0')}</Text>
                        
                        <View style={chartStyles.barBackground}>
                            <View style={[
                                chartStyles.barFill, 
                                { width: barWidth, backgroundColor: barColor }
                            ]} />
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const chartStyles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    statName: {
        width: 70,
        fontSize: 14,
        fontWeight: '600',
        color: '#777',
        textAlign: 'right',
        paddingRight: 10,
    },
    statValue: {
        width: 35,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    barBackground: {
        flex: 1,
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
        marginLeft: 10,
    },
    barFill: {
        height: '100%',
        borderRadius: 5,
    },
});

export default StatsChart;