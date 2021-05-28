import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';






export default class Homescreen extends Component {
  constructor(props){
    super(props)
          
  }

  render() {
    /*AsyncStorage.getItem("user_token").then((value) => {})
      .then(res => {
          //do something else
          this.setState({"user_token": res});
          
          
      });*/
    
      
    const token = () =>{ 
      new Promise((resolve, reject) => {AsyncStorage.getItem("user_token")
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
  });
};
        

      
    console.log(token)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>About Screen</Text>
      </View>
    )
  }
}