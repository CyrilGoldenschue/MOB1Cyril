import axios from 'axios';
import React, { Component } from 'react';
import {ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert  } from 'react-native';
import Picker from "../../components/Picker"
import APIKit from "../../components/api"
import AsyncStorage from '@react-native-community/async-storage'



class LoginScreen extends Component {
  constructor(props){
    super(props),
    this.state = {initials: "", password: ""}
  }

  onInitialsChange = initials => {
    this.setState({initials: initials});
  };

  onPasswordChange = password => {
    this.setState({password: password});
  };

  onPressLogin() {
    const {initials, password} = this.state;
    const payload = {initials, password};
    console.log(payload);

    const onSuccess = ({data}) => {
      this.setState({userToken: data.token});
      AsyncStorage.setItem('user_token', this.state.userToken);
      this.props.navigation.push('Home')
    };

    const onFailure = error => {
      console.log(error && error.response);
    };

    APIKit.post('gettoken', payload)
      .then(onSuccess)
      .catch(onFailure);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          
            <Text style={styles.text}>Initiales</Text>
            <TextInput 
            style={styles.input}
            onChangeText={this.onInitialsChange}
            ></TextInput>
            <Text style={styles.text}>Mot de passe</Text>
            <TextInput 
            style={styles.input} 
            secureTextEntry
            onChangeText={this.onPasswordChange}
            ></TextInput>
            <Text style={styles.text}>Base</Text>
            <Picker></Picker>
            <View style={[{ width: "50%" , marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={this.onPressLogin.bind(this)}
                title="Se Log"
              />
            </View>
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
  headerStyle: {
  	elevation: 0, // remove shadow on Android
  	shadowOpacity: 0, // remove shadow on iOS
    borderBottomWidth: 0 // Just in case.
}
  
  });


export default LoginScreen;