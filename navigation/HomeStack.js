import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
   
    <Stack.Navigator headerMode='none' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={Tabs} />
        
    </Stack.Navigator>
   
  );
}