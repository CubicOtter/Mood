import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Card} from 'react-native-elements'
import { Button, TextInput } from 'react-native'; 
import firebase from '../backend/Firebase';

// To handle push Notifications
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// Implementation for swuipe rating is here: https://github.com/Monte9/react-native-ratings
// Import for rate bar
import {Rating} from 'react-native-ratings';


export default function DashboardScreen({navigation}) {
  
  // Redirect to Login page if not logged in
  useEffect(() => {
    if(!firebase.getCurrentUsername()) {
      // not logged in
      alert('Please login first');
      navigation.navigate('Home'); // Go back to Home Menu if not logged in
    }
  });

  const [rating, setRating] = useState(2.5); //Basic value fo rating: 2.5
  const [comment, setComment] = useState(''); // Keep comment entered
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`You rated your mood: ${rating}`)
    console.log(`You rated your mood: ${rating}`)
  }


  // Const to get user Push Token
  const [token, setToken] = React.useState("");

  // Constant to check if notification has already been scheduled
  const [notifScheduled, setNotifScheduled] = React.useState(false);

  // Define the shape of a local Notification
  const localNotification = {
    title: 'Mood - How do you feel today?',
    body: 'It may be time to rate your mood', // (string) — body text of the notification.
    icon: "./assets/images/logo_notification.png",
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      icon: "./assets/images/logo_resized.png", //(optional) (string) — URL of icon to display in notification drawer.
      color: "9DB8FF", // (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };


  if(!firebase.getCurrentUsername()) {
    // not logged in
    navigation.navigate('Home'); // Go back to Home Menu if not logged in
    alert('Please login first');
    return (
      <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.questionText}>Please login first !</Text>
          </ScrollView>

      </View>
    );
  } else {
      return (
        <View style={styles.container}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.questionText}> Hello {firebase.getCurrentUsername()}!</Text>
            <Card title="How do you feel today?" containerStyle={styles.card}>
                <Rating
                type='heart'
                ratingCount={5}
                imageSize={60}
                fractions={1}
                startingValue={2.5}
                showRating
                onFinishRating={event => setRating(event)}
                />

            <Text style={styles.commentText}> Enter your comment:</Text>


            <Card containerStyle={styles.card}>
                <TextInput autocorrect={false} autocapitalize="none" value={comment} onChangeText={text => setComment(text)} />
            </Card>


            <TouchableOpacity title="Register Mood" style={styles.buttonRegister} onPress={handleSubmit, onRegisterMood} >
                  <Text style={styles.textRegisterButton} >Register Mood</Text>
            </TouchableOpacity>

            </Card>

            <TouchableOpacity style={styles.notificationButton} onPress={scheduleNotification} >
                  <Text style={styles.textNotificationButton} >Allow Notifications</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.button} onPress={logout} >
                  <Text style={styles.textButton} >Disconnect</Text>
            </TouchableOpacity>
          
          </ScrollView>

          
        </View>
        
      );
    };

  async function logout() {
		await firebase.logout();
		navigation.navigate("Home"); //Redirect to HomeScreen when logged out
  }

  
  async function onRegisterMood() {
    try {
      await firebase.registerMood(rating, comment);
      alert('Your mood has been registered online');
      navigation.navigate("Home"); // Go back to home menu

    } catch(error) {
      alert(error.message);
    }
  }


  // Function to ask user to grant permission and prints the token on console
  // Taken on the website of expo: https://docs.expo.io/versions/latest/guides/push-notifications/
  async function getPushNotificationPermissions() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      alert("Failed to get permission for notifications from your phone");
      return;
    }
    // console.log(finalStatus)

    // Get the token that uniquely identifies this device
    tok = await Notifications.getExpoPushTokenAsync();
    console.log("Notification Token: ", tok);
    setToken(tok);

    // Specific display if on Android
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    };
  }


  async function scheduleNotification() {
    try {
      if (token == "") {
         await getPushNotificationPermissions();
      } else {
        alert("You already scheduled a notification");
      };
    } catch(e) {
      // We might want to provide this error information to an error reporting service
      console.warn(e);
    } finally {
      if (notifScheduled == false) { 

          Notifications.cancelAllScheduledNotificationsAsync(); // Cancel all previous scheduled notification
          // Pour éviter que Bibi en programme 60 par heures quand il s'amuse

          let t = new Date().getTime() + 60000; // 260000 = 1 hour from now
          // First notification received one minute after to test

          // Options for schedules notifications
          const schedulingOptions = {
            time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
            repeat: 'hour',
          };
    
          Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions); // Create the scheduled notification

          Notifications.addListener(notification => navigation.navigate("Dashboard"));

          console.log("Notification scheduled every hour");
          alert("Notification scheduled every hour")
    
          setNotifScheduled(true); // Update notifScheduled statut
    
        } else  {
          console.log("Failed to schedule notification");
          return;
        };
      }
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    paddingTop: 15,
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
    marginHorizontal: 30,
    alignItems: "center",
    backgroundColor: "#FFE39E",
    padding: 15,
  },
  textButton: {
    fontSize: 20,
    color: "#B3944B",
  },
  commentText: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
  },
  buttonRegister: {
    marginTop: 15,
    backgroundColor: "#395CB3",
    padding: 5,
    alignItems: "center",
    marginHorizontal: 25,
  },
  textRegisterButton: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  notificationButton: {
    marginTop: 40,
    marginHorizontal: 40,
    alignItems: "center",
    backgroundColor: "#395CB3",
    padding: 10,
  },
  textNotificationButton: {
    fontSize: 20,
    color: "#FFFFFF",
  }
});
