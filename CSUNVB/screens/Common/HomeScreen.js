import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

export default class Homescreen extends Component {
  constructor(props){
    super(props)
  }
  
  
    //TODO emêcher le remove avant l'activation du bouton
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[{ width: "50%" , marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={() => {
                  this.props.navigation.push("Report")
                }}
                title="Rapport"
              />
          </View>
          <View style={[{ width: "50%" , marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={() => {
                  this.props.navigation.push("Consult")
                }}
                title="Consultation"
              />
          </View>
          <View style={[{ width: "50%" , marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={() => {
                  localStorage.removeItem('user_token');
                  let userToken = localStorage.getItem('user_token')
                  this.props.auth(userToken)
                  
                  
                }}
                title="Se déconnecter"
              />
          </View>
      </View>
    )
  }
}