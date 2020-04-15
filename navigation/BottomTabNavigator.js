import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Login from '../screens/Login';
import Register from '../screens/Register';
import firebase from '../backend/Firebase';

import { MaterialHeaderButtons, Item } from '../components/HeaderButtons';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:,
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
    navigation.setOptions({
        headerTitle: getHeaderTitle(route),
        headerStyle: {
            backgroundColor: '#9DB8FF',
        },
        headerTitleStyle: {
          color: '#FFFFFF'
        },
        headerShown: displayOrNotHeader(route), // choose if we display header or not
        headerLeft: () => (
          <MaterialHeaderButtons>
            <Item title="Back" onPress={() => navigation.goBack(null)} />  
          </MaterialHeaderButtons>
        ),  // Creation of a button to go back on previous screen
    });


  // Different Bottom Bar depending of whether the user is logged in or not
  // If the user is not connected, login and register options are avaialable, but not Dashboard
  // If the user is logged in, the options login and register are not available, and the Dashboard is available
  if(!firebase.getCurrentUsername()) {
    return (
      <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
        /> 
        
        <BottomTab.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            tabBarVisible: false, //Doesn't display the tabBar
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-unlock" />,
          }}
        />

        <BottomTab.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register',
            tabBarVisible: false, //Doesn't display the tabBar
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
          }}
        />

        <BottomTab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'My Mood',
            tabBarVisible: true, //Doesn't display the tabBar
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-build" />,
          }}
        />

      </BottomTab.Navigator>
    );
  } else {
      return(
        <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
          }}
        /> 
        
        <BottomTab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            title: 'My Mood',
            tabBarVisible: false, //Doesn't display the tabBar
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-build" />,
          }}
        />

      </BottomTab.Navigator>
      );
  }

}



function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Menu';
    case 'Dashboard':
      return 'Dashboard';
    case 'Login':
      return 'Login';
    case 'Register':
      return 'Register';
  }
}


function displayOrNotHeader(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return false;
    case 'Dashboard':
      return true;
    case 'Login':
      return true;
    case 'Register':
      return true;
  }
}

function redirectButton(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return '';
    case 'Dashboard':
      return 'navigation.goBack(null)';
    case 'Login':
      return 'navigation.goBack(null)';
    case 'Register':
      return 'navigation.goBack(null)';
  }
}
