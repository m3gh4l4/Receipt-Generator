import React from 'react';
import { View, Text } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/home';
import { NavigationContainer } from '@react-navigation/native';
import Form from './screens/form';
import Receipt from './screens/receipt';
import SS from './screens/screenshot';

const Stack = createNativeStackNavigator();
const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="HOME" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="Form" component={Form} options={{headerShown:false}}/>
        <Stack.Screen name="Receipt" component={Receipt} options={{headerShown:false}} />
        <Stack.Screen name="SS" component={SS}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
