import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {Card} from 'react-native-elements'
import { Button } from 'react-native'; 

// Implementation for swuipe rating is here: https://github.com/Monte9/react-native-ratings
// Import for rate bar
import {Rating} from 'react-native-ratings';




export default function DashboardScreen() {
  const [rating, setRating] = useState(0); //Basic value fo rating: 2.5
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    alert(`You rated your mood: ${rating}`)
    console.log(`You rated your mood: ${rating}`)
  }

  return (

    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  questionText: {
    fontSize: 20,
    textAlign: 'center',
  }
});
