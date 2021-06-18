import React, { Component } from 'react';
import { Button, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

import APIKit from "../../components/api"

export default class Homescreen extends Component {
  constructor(props){
    super(props),
    this.state = {base: "", initials: ""}
  }
  
  getBasesData() {
        
    APIKit.getBases()
        .then(res => {
            const dataBase = res.data
            this.base = dataBase.map(u =>
              {
                if(u.id == localStorage.getItem("base")){
                  this.setState({
                    base: u.name
                  })
                  localStorage.setItem("baseName", u.name)
                }
              }
            )
        })
        .catch((error) => {
            console.log(error)
        })
  }

  getUserData() {
        
      APIKit.getUser()
        .then(res => {
            const dataUser = res.data
            this.setState({
              initials: dataUser.initials
            })
        })
        .catch((error) => {
            console.log(error)
        })
  }

  componentDidMount(){
    
    this.getUserData()
    this.getBasesData()
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ImageBackground source={image} style={styles.image}>
        <View>
            <TouchableOpacity 
              activeOpacity={0.80} 
              style={styles.buttonMenu} 
              onPress={() => {
                localStorage.setItem('nav', "Consult");
                this.props.navigation.navigate("Consult")
              }}>
                <Text style={styles.textMenu}>Consultation</Text>
            </TouchableOpacity>

          </View>
        <View>
            <TouchableOpacity 
              activeOpacity={0.80} 
              style={styles.buttonMenu} 
              onPress={() => {
                localStorage.setItem('nav', "Report");
                this.props.navigation.navigate("Report")
              }}>
                <Text style={styles.textMenu}>Rapport</Text>
            </TouchableOpacity>

          </View>
          
          <View>
            <TouchableOpacity 
              activeOpacity={0.95} 
              style={styles.buttonLogout} 
              onPress={() => {
                localStorage.clear();
                let userToken = localStorage.getItem('user_token')
                this.props.auth(userToken)
              }}>
                <Text style={styles.textLogout}>Se déconnecter {this.state.initials}@{this.state.base}</Text>
            </TouchableOpacity>
          </View>
          </ImageBackground>
      </View>
    )
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
  buttonMenu: {
    width: "96%", 
    marginLeft: "2%",
    flexDirection: 'row', 
    height: 250, 
    backgroundColor: 'rgb(33, 150, 243)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: 10,
    elevation:3,
  },
    buttonLogout: {
      width: "96%", 
      marginLeft: "2%",
      flexDirection: 'row', 
      height: 70, 
      backgroundColor: 'rgb(33, 150, 243)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation:3,
  },
  textMenu: {
    fontSize: 50,
    color: "white",
    fontWeight: 'bold',
  },
  textLogout: {
    fontSize: 16,
    color: "white",
    fontWeight: 'bold',
  }
  
});


