import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login'
import Mensagens from './pages/Mensagens'
import Conversas from './pages/Conversas'


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}  />
        <Stack.Screen name="Mensagens" component={Mensagens} />
        <Stack.Screen name="Conversas" component={Conversas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes