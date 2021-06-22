import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Badge, } from 'react-native-elements'

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import APIKit from "../../components/Api";

export default class Homescreen extends Component {
  constructor(props) {
    super(props), (this.state = { base: "", initials: "", workPlan: [""] });
  }

  getBasesData() {
    APIKit.getBases()
      .then((res) => {
        const dataBase = res.data;
        this.base = dataBase.map((u) => {
          if (u.id == localStorage.getItem("base")) {
            this.setState({
              base: u.name,
            });
            localStorage.setItem("baseName", u.name);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUserData() {
    APIKit.getUser()
      .then((res) => {
        const dataUser = res.data;
        this.setState({
          initials: dataUser.initials,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getWorkPlanData() {
    APIKit.getUnconfirmedWorkPlan()
      .then((res) => {
        const dataWorkPlan = res.data;
        this.setState({
          workPlan: dataWorkPlan,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserData();
    this.getBasesData();
    this.getWorkPlanData();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={ this.state.workPlan.length > 0 ? (styles.buttonMenuSmall) : (styles.buttonMenu)}
              onPress={() => {
                localStorage.setItem("nav", "Consult");
                this.props.navigation.navigate("Consult");
              }}
            >
              <Text style={styles.textMenu}>Consultation</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={ this.state.workPlan.length > 0 ? (styles.buttonMenuSmall) : (styles.buttonMenu)}
              onPress={() => {
                localStorage.setItem("nav", "Report");
                this.props.navigation.navigate("Report");
              }}
            >
              <Text style={styles.textMenu}>Rapport</Text>
            </TouchableOpacity>
          </View>
          { this.state.workPlan.length > 0 ? (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.buttonMenuSmall}
              onPress={() => {
                localStorage.setItem("nav", "Report");
                this.props.navigation.navigate("Report");
              }}
            >
              <Text style={styles.textMenu}>Horaires à confirmer</Text>
              
            </TouchableOpacity>
            <Badge
                value={`${this.state.workPlan.length}`} 
                status="error"
                containerStyle={{ position: 'absolute', top: 2, right: 3 }}
              />
          </View>
          ) : "" }
          <View>
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.buttonLogout}
              onPress={() => {
                localStorage.clear();
                let userToken = localStorage.getItem("user_token");
                this.props.auth(userToken);
              }}
            >
              <Text style={styles.textLogout}>
                Se déconnecter {this.state.initials}@{this.state.base}
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const image = {
  uri: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2t5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
};

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
    flexDirection: "row",
    height: 250,
    backgroundColor: "rgb(33, 150, 243)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
    elevation: 3,
  },
  buttonMenuSmall: {
    width: "96%",
    marginLeft: "2%",
    flexDirection: "column",
    height: 150,
    backgroundColor: "rgb(33, 150, 243)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 10,
    elevation: 3,
  },
  buttonLogout: {
    width: "96%",
    marginLeft: "2%",
    flexDirection: "row",
    height: 70,
    backgroundColor: "rgb(33, 150, 243)",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  textMenu: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  textLogout: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
