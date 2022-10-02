import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Login from '../views/Login';
import Stocks from '../views/Stocks';
import Education from '../views/Education';
import Portfolio from '../views/Portfolio';
import Stock from '../views/Stock';
import {MainContext} from '../contexts/MainContext';
import {Icon} from '@rneui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator tabBarPosition={'bottom'}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={Stocks}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Education"
        component={Education}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={TabScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Stock" component={Stock} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <TabScreen />
    </NavigationContainer>
  );
};

export default Navigator;
