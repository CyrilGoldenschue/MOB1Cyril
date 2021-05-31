import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from '@react-navigation/native';

import {token} from "../../components/api";





export default class Homescreen extends Component {
  constructor(props){
    super(props)
    this.state = {token: token}
  }

  render() {
    /*AsyncStorage.getItem("user_token").then((value) => {})
      .then(res => {
          //do something else
          this.setState({"user_token": res});
          
          
      });*/
    
       
          

        

      
    console.log(this.state.token)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.token}</Text>
      </View>
    )
  }
}