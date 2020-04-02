import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';


import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Dashboard from '../screens/Dashboard';
import logo from '../assets/images/robot-prod.png';

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

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: 'My Mood',
          tabBarVisible: false,
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
    </BottomTab.Navigator>
  );
}


function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Menu';
    case 'Dashboard':
      return 'Dashboard';
  }
}


function displayOrNotHeader(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return false;
    case 'Dashboard':
      return true;
  }
}
