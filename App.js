import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

// File with log data for the firebase server and class with basic functions to manage it
import firebase from './backend/Firebase'; 

// Navigator between screens
const Stack = createStackNavigator();


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

    
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'caveat': require('./assets/fonts/Caveat-Regular.ttf'),
          'caveat-bold': require('./assets/fonts/Caveat-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);


  // Const to know if server is loaded or not
  const [firebaseInitialized, setFirebaseInitialized] = React.useState(false);

  // Check if firebase is initialized before rendering the app
  React.useEffect(() => {firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    });
  });
  

  if (!isLoadingComplete && !props.skipLoadingScreen ) {   // Show nothing if the app is not loaded
    return null;
  } else if (firebaseInitialized == false) {  //add initialization of firebase as a condition to start the app
    return null;
  } else { // App loaded and firebase initialized!  
    return ( 
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator >
            <Stack.Screen name="Root" component={BottomTabNavigator} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
