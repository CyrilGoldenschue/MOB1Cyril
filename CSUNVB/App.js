import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigate from "./navigations/Navigate"
import FlashMessage from "react-native-flash-message";

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      
      <NavigationContainer>
        <Navigate />
        <FlashMessage position="top" />
      </NavigationContainer>
    )
  }
}

 
