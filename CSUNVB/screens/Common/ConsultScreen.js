import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import ConsultationView from "../../components/consult";

let textBack = "<";

export default class Reportscreen extends Component {
  constructor(props) {
    super(props), (this.state = { sort: "" });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerConsult}>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.buttonGoBack}
            onPress={() => {
              localStorage.setItem("nav", "Home");
              this.props.navigation.navigate("Home");
            }}
          >
            <Text style={styles.textBack}>{textBack}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Consultation</Text>
        </View>

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
  headerConsult: {
    flexDirection: "row",
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

  buttonGoBack: {
    width: 50,
    height: 50,
    marginLeft: "2%",
    backgroundColor: "rgb(33, 150, 243)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    elevation: 3,
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
    fontSize: 50,
    marginLeft: "2%",
    fontWeight: "bold",
  },
});
