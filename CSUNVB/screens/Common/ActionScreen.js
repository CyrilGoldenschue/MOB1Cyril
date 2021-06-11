import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import APIKit from "../../components/api";
import DataAction from "../../components/dataAction";

let textBack = "<";

export default class Actionscreen extends Component {
  constructor(props) {
    super(props),
    (this.state = { actions: [], actionId: "" })
  }

  /*getActionsData() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    };
    console.log(this.state.actionId);
    APIKit.get("myactionsinshift/" + this.state.actionId, config)
      .then((res) => {
        const dataAction = res.data;
        console.log(dataAction);
        this.setState({
          actions: dataAction.initials,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }*/

  componentDidMount() {
    // Handle focus, in case of back button hit'
    this.props.navigation.addListener("focus", () => {
      console.log("Got focused");

      //this.getActionsData();
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerAction}>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.buttonGoBack}
            onPress={() => {
              localStorage.setItem("nav", "Consult");
              localStorage.removeItem("actionId")
              this.props.navigation.navigate("Consult");
            }}
          >
            <Text style={styles.textBack}>{textBack}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Mes actions</Text>
        </View>

        <View style={styles.page}>
          <DataAction />
          
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  headerAction: {
    flexDirection: "row",
  },
  page: {
    flex: 3,
    marginTop: 20,
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
  },
  textBack: {
    fontSize: 50,
    color: "white",
  },
  title: {
    fontSize: 45,
    marginLeft: "5%",
    fontWeight: "bold",
  },
});
