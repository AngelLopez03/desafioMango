import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { headerProp } from '../../models/interfaces/pokemonDetails';
import StatsChart from '../chart/StatsChart';

const BodyDetalle: React.FC<headerProp> = ({ pokemonDetails }) => {
    const [activeTab, setActiveTab] = useState('About');
    const { flavorText, height, weight, stats, abilities } = pokemonDetails;

    console.log(abilities);
    

    const displayAbilities = abilities || [];

    const renderAboutContent = () => (
        <View style={styles.sectionContainer}>
            <View style={styles.section}>
                <Text style={styles.description}>{flavorText}</Text>
            </View>
            <View style={{...styles.section, ...styles.about}}>
                <View>
                    <Text style={ styles.subHeader }>Height:</Text>
                    <Text style={ styles.label }>{ height } m</Text>
                </View>
                <View>
                    <Text style={styles.subHeader}>Weight:</Text>
                    <Text style={ styles.label }>{ weight } kg</Text>
                </View>
            </View>
            <View style={{ paddingLeft: 5 }}>
                <Text style={styles.subHeader}>Abilities</Text>
                <View>
                    {displayAbilities.map(({ability, is_hidden}) => (
                        <Text 
                            key={ability.name} 
                            style={styles.abilityText}
                        >
                            • {ability.name.charAt(0).toUpperCase() + ability.name.slice(1)} 
                            {is_hidden && " (Hidden)"}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );

    const renderStatsContent = () => (
        <View style={styles.section}>
            <StatsChart stats={stats} />
        </View>
    );

    const renderEvolutionContent = () => (
        <View style={styles.section}>
            <Text>Cadena de Evolución...</Text>
        </View>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'Stats':
                return renderStatsContent();
            case 'Evolution':
                return renderEvolutionContent();
            case 'About':
            default:
                return renderAboutContent();
        }
    }

    return (
        <>
            <View style={styles.tabsContainer}>
                {['About', 'Stats', 'Evolution'].map((tabName) => (
                    <Text 
                        key={tabName}
                        style={{...(activeTab === tabName ? styles.activeTab : styles.tab), ...styles.btnTab}}
                        onPress={() => setActiveTab(tabName)}
                    >
                        {tabName}
                    </Text>
                ))}
            </View>
            <View style={styles.container}>
                {renderContent()}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 20,
    },
    btnTab: {
        width: 'auto',
        borderRadius: 20,
        padding: 10,
    },
    activeTab: {
        fontWeight: 'bold',
        color: '#FFF',
        backgroundColor: '#7AC74C',
        paddingHorizontal: 15,
    },
    tab: { color: 'gray', paddingHorizontal: 15 },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    sectionContainer: {
        gap: 20
    },
    section: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
    },
    description: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },

    about: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dataItem: {
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: 'gray',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    abilityText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
    }
});

export default BodyDetalle;