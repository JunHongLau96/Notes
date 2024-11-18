import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import CreateScreen from '../screen/CreateScreen';
import SettingsScreen from '../screen/SettingsScreen';
import SummaryScreen from '../screen/SummaryScreen';

// Define the type for navigation routes
export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Summary: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const options = {headerShown: false};
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={options} />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={options}
        />
        <Stack.Screen
          name="Summary"
          component={SummaryScreen}
          options={options}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
