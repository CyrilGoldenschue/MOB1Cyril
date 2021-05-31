import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Navigate from "./navigations/Navigate"

export default class App extends Component { 
  constructor(props){
    super(props);
  }

  render(){
    return (
      
      <NavigationContainer>
        <Navigate />
      </NavigationContainer>
    )
  }
}

 
