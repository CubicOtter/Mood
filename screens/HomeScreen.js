import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText, MonoTextBold } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
        <View style={styles.presentationContainer, styles.gapTop}>
          <MonoTextBold style={styles.nameText}>Mood</MonoTextBold>
        </View>

        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/logo.png')
                : require('../assets/images/logo.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.presentationContainer}>
          <MonoText style={styles.presentationText}>The weel-being tracking app</MonoText>
        </View>

      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9DB8FF',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 210,
    height: 210,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  presentationContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  gapTop: {
    marginTop: 70,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  nameText: {
    fontSize: 45,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  presentationText: {
    fontSize: 25,
    color: '#FFFFFF',
    lineHeight: 40,
    textAlign: 'center',
  },
});
