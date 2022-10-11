import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Login from '../views/Login';
import Stocks from '../views/Stocks';
import Education from '../views/Education';
import Portfolio from '../views/Portfolio';
import Stock from '../views/Stock';
import StockBuy from '../views/StockBuy';
import Leaderboard from '../views/Leaderboard';
import {MainContext} from '../contexts/MainContext';
import {Icon} from '@rneui/themed';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserView from '../views/UserView';

import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator tabBarPosition={'bottom'} style={styles.tabNav}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#c7fe61',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: '#2b2e3f'},
        }}
      />
      <Tab.Screen
        name="Stocks"
        component={Stocks}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="waterfall-chart" color={color} />
          ),
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#c7fe61',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: '#2b2e3f'},
        }}
      />
      <Tab.Screen
        name="Education"
        component={Education}
        options={{
          tabBarIcon: ({color}) => <Icon name="school" color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#c7fe61',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: '#2b2e3f'},
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({color}) => <Icon name="pie-chart" color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#c7fe61',
          tabBarInactiveTintColor: 'grey',
          tabBarStyle: {backgroundColor: '#2b2e3f'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => <Icon name="account-circle" color={color} />,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#c7fe61',
          tabBarInactiveTintColor: 'grey',
          tabBarItemStyle: 'grey',
          tabBarStyle: {backgroundColor: '#2b2e3f'},
        }}
      />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);
  return (
    <Stack.Navigator
      screenOptions={{statusBarColor: '#2b2e3f', navigationBarColor: '#191a24'}}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Back"
            component={TabScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'MyApp',
          }}
        />
      )}
      <Stack.Screen
        name="Stock"
        component={Stock}
        options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#2b2e3f'},
          title: 'Commodity analytics',
        }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name='Leaderboard' component={Leaderboard} />
      <Stack.Screen name='UserView' component={UserView} />
      <Stack.Screen
        name='StockBuy'
        component={StockBuy}
        options={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: '#2b2e3f'},
          title: 'Place an order',
        }}
      />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

const styles = {
  tabNav: {
    marginBottom: vh(2),
  }
}

export default Navigator;
