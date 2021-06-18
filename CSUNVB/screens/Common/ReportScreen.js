import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import ReportView from "../../components/reportCard"

let textBack = "<"

export default class Reportscreen extends Component {
  constructor(props){
    super(props),
    this.state = ({sort: ""})
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.headerReport}>
            <TouchableOpacity 
              activeOpacity={0.95} 
              style={styles.buttonGoBack} 
              onPress={() => {
                localStorage.setItem('nav', "Home");
                this.props.navigation.navigate("Home");
              }}>
                <Text style={styles.textBack}>{textBack}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Rapports</Text>
          </View>
          <View style={styles.page}>
            <Text style={styles.text}>Faire un</Text>
            <View style={styles.div}>
              <TouchableOpacity 
                  activeOpacity={0.95} 
                  style={styles.buttonCheck} 
                  onPress={() => {
                    this.setState({sort: "pharma"})
                  }}>
                    <Text style={styles.text}>Pharmacheck</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  activeOpacity={0.95} 
                  style={styles.buttonCheck} 
                  onPress={() => {
                    this.setState({sort: "nova"})
                  }}>
                    <Text style={styles.text}>NovaCheck</Text>
                </TouchableOpacity>
              </View>
            <Text style={styles.text}>à {localStorage.getItem("baseName")}</Text>


            <ReportView sort={this.state.sort}/>

          </View>
          
      </View>
    )
  }
}

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
  
  headerReport: {
    flexDirection: 'row',
  },
  page: {
    flex: 3,
    marginTop: 20
  },
  div: {
    flexDirection: 'row',
    justifyContent: "center"
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
  buttonCheck:{
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'rgb(33, 150, 243)',
    width: 150, 
    height: 30,
  },


  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textBack: {
    fontSize: 50,
    color: "white",
  },
  title: {
    fontSize: 45,
    marginLeft: "15%",
    fontWeight: "bold"
  }
  
  });
  
  
  