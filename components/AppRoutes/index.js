import React, {
  useContext,
  useEffect,
} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation, useIsFocused } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';

import AuthContext from '../../providers/AuthContext';

import LoginScreen from '../../screens/Login';
import HomeScreen from '../../screens/Home';
import LoadingScreen from '../../screens/Loading';

const Stack = createStackNavigator();

export const routesDefinition = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Loading',
    component: LoadingScreen,
  },
];

function AppRoutes() {
  // const isFocused = useIsFocused();
  const navigation = useNavigation();
  const context = useContext(AuthContext);
  const {
    logged,
  } = context;

  useEffect(() => {
    if (logged) {
      navigation.navigate('Loading');
    } else {
      navigation.navigate('Login');
    }
  }, [logged, /* isFocused */]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      {routesDefinition.map((route) => (
        <Stack.Screen
          name={route.name}
          component={route.component}
          key={`route-${route.name}`}
        />
      ))}
    </Stack.Navigator>
  );
}

function Routes() {
  enableScreens();
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}

export default Routes;
