import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Card} from 'react-native-elements'
import { Button } from 'react-native'; 
import firebase from '../backend/Firebase';

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

  const [rating, setRating] = useState(0); //Basic value fo rating: 2.5
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`You rated your mood: ${rating}`)
    console.log(`You rated your mood: ${rating}`)
  }

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
        <Button title="Register Mood" variant="contained" color="#395CB3" size={20} onPress={handleSubmit}/>
        </Card>

      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={logout} >
            <Text style={styles.textButton} >Disconnect</Text>
      </TouchableOpacity>
      
    </View>
    
  );

  async function logout() {
		await firebase.logout();
		navigation.navigate("Home"); //Redirect to HomeScreen when logged out
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
    marginBottom: 30,
    marginHorizontal: 30,
    alignItems: "center",
    backgroundColor: "#FFE39E",
    padding: 15,
  },
  textButton: {
    fontSize: 20,
    color: "#B3944B",
  },
});
