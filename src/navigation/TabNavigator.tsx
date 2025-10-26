import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BasketScreen from '../screens/Basket';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useAppContext } from '../context/AppContext';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const { getTotalItems } = useAppContext();

    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: any }) => ({
                tabBarStyle: {
                    height: 80,
                    paddingBottom: 20,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    elevation: 0,
                    shadowOpacity: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#666666',
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: 500,
                    marginBottom: 4,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
                        return (
                            <MaterialIcons name="home" size={24} color={focused ? '#007AFF' : '#666666'} />
                        );
                    },
                    title: 'Ana Sayfa',
                }}
            />
            <Tab.Screen
                name="Basket"
                component={BasketScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
                        const totalItems = getTotalItems();
                        return (
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="shopping-cart" size={24} color={focused ? '#007AFF' : '#666666'} />
                                {totalItems > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{totalItems}</Text>
                                    </View>
                                )}
                            </View>
                        );
                    },
                    title: 'Sepet',
                }}
            />

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -8,
        top: -8,
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default TabNavigator; 