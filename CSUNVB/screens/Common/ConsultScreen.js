import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Header from "../../components/Header";
import ConsultationView from "../../components/ConsultCard";

export default class Reportscreen extends Component {
  constructor(props) {
    super(props), (this.state = { sort: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Header nav={this.props.navigation} title="Consultations" previous="Home" />

        <View style={styles.page}>
          <Text style={styles.text}>Voir mes rapports de</Text>
          <View style={styles.div}>
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.buttonCheck}
              onPress={() => {
                this.setState({ sort: "garde" });
              }}
            >
              <Text style={styles.text}>Garde</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.95}
              style={styles.buttonCheck}
              onPress={() => {
                this.setState({ sort: "stup" });
              }}
            >
              <Text style={styles.text}>Stup</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: 20, marginTop: 20}}>
          <ConsultationView nav={this.props.navigation} sort={this.state.sort} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
    textAlign: "center",
  },
  page: {
    flex: 3,
    marginTop: 20,
    justifyContent: "left",
  },
  div: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonCheck: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgb(33, 150, 243)",
    width: 150,
    height: 30,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15
  },
  textBack: {
    fontSize: 50,
    color: "white",
  },
  title: {
    fontSize: 45,
    marginLeft: "2%",
    fontWeight: "bold",
  },
});
