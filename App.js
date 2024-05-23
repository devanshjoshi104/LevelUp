import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ModelsScreen from './ModelsScreen';
import ModelDetailScreen from './ModelDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#060c21', // Set the background color of the header
          },
          headerTintColor: '#caedff', // Set the color of the header text
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Level Up' }} />
        <Stack.Screen name="Models" component={ModelsScreen} options={{ title: 'Models' }} />
        <Stack.Screen name="ModelDetail" component={ModelDetailScreen} options={{ title: 'Model Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
