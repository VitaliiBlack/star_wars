import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PeoplesPage from '../pages/PeoplesPage';
import PersonPage from '../pages/PersonPage';
import {RootStackParamList} from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Peoples"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Peoples" component={PeoplesPage} />
      <Stack.Screen name="Person" component={PersonPage} />
    </Stack.Navigator>
  );
};
