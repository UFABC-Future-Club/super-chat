import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login'
import Mensagens from './pages/Mensagens'

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode={'none'}>
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Mensagens" component={Mensagens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes