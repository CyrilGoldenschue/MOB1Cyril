import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

import {token} from "../../components/api";

export default class Homescreen extends Component {
  constructor(props){
    super(props)
    this.state = {token: token}
  }

  onPressLogout() {
    
      localStorage.setItem('user_token', null);
      this.props.navigation.push("Login")

    

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
        <View style={[{ width: "50%" , marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={this.onPressLogout.bind(this)}
                title="Unlog"
              />
            </View>
      </View>
    )
  }
}