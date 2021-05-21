import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, View } from 'react-native';
import Picker from "./Picker"

class LoginScreen extends Component {

  

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          
            <Text style={styles.text}>Initiales</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.text}>Mot de passe</Text>
            <TextInput style={styles.input}></TextInput>
            <Text style={styles.text}>Base</Text>
            <Picker></Picker>

        </ImageBackground>
      </View>
    );
  }
}

const image = { uri: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2t5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
    
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFFFFF",
    
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  });


export default LoginScreen;