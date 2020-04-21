import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Form, Label} from 'native-base';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {Card} from 'react-native-elements';
import firebase from '../backend/Firebase';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Form>
            <View style={styles.labelContainer} >
              <Label style={styles.labelText} >E-mail</Label>
              <Card containerStyle={styles.card}>
                <TextInput autocorrect={false} autocapitalize="none" value={email} onChangeText={text => setEmail(text)} />
              </Card>
            </View>

            <View style={styles.labelContainer} >
              <Label style={styles.labelText} >Password</Label>
              <Card containerStyle={styles.card}>
                <TextInput secureTextEntry={true} autocorrect={false} autocapitalize="none" value={password} onChangeText={text => setPassword(text)}/>
              </Card>
            </View>         

          <TouchableOpacity style={styles.button} onPress={onLogin} >
            <Text style={styles.textButton} >Login</Text>
          </TouchableOpacity>

        </Form>
           

      </ScrollView>
    </View>
  );

  async function onLogin() {
    try {
          await firebase.login(email, password);
          navigation.navigate("Home"); // Redirect to Dashboard if succesfully logged in
    } catch(error) {
          alert(error.message)
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
    justifyContent: 'center',
    marginVertical: 25,
  },
  labelText: {
    fontSize: 18,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 30,
    alignItems: "center",
    backgroundColor: "#FFE39E",
    padding: 15,
  },
  textButton: {
    fontSize: 20,
    color: "#B3944B",
  },
  labelContainer: {
    marginHorizontal: 10,
  },
  card: {
  },
});

