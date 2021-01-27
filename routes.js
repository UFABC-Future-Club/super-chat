import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login'

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen  name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default Routes