import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

let textBack = "<"

export default class Reportscreen extends Component {
  constructor(props){
    super(props)
  }
  
  render() {
    console.log(textBack)
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.header}>
            <TouchableOpacity 
              activeOpacity={0.95} 
              style={styles.buttonGoBack} 
              onPress={() => {
                localStorage.setItem('nav', "Home");
                this.props.navigation.navigate("Home")
              }}>
                <Text style={styles.textBack}>{textBack}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Rapports</Text>
          </View>
          <View style={styles.page}>
            <View style={[{ width: "50%" , marginLeft: "25%" }]}>
                <Button
                  size={15}
                  color="blue"
                  onPress={() => {
                    this.props.navigation.pop(1)
                  }}
                  title="Rapport"
                />
            </View>
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
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    flex: .3,
    flexDirection: 'row',
  },
  page: {
    flex: 3,
    marginTop: 20
  },
  buttonGoBack: {
    width: 50, 
    height: 50, 
    marginLeft: "2%",
    backgroundColor: 'rgb(33, 150, 243)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "2%",
    elevation:3,
  },
  textBack: {
    fontSize: 50,
    color: "white",
  },
  title: {
    fontSize: 50,
    marginLeft: "15%",
    color: "white",
    fontWeight: "bold"
  }
  
  });
  
  
  