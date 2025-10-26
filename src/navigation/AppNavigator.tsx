import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetails';
import { AppProvider } from '../context/AppContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigator from './TabNavigator';


const Stack = createNativeStackNavigator();


const queryClient = new QueryClient();

const AppNavigator = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);


  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={"TabNavigator"}
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#007AFF',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerShadowVisible: false,
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                  gestureEnabled: false,
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetails as any}
                options={{
                  presentation: 'card',
                  headerBackTitle: 'Geri',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default AppNavigator; 