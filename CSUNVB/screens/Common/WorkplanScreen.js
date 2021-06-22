import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text
} from "react-native";

import Header from "../../components/Header";
import DataWorkplay from "../../components/WorkplanCard";
import APIKit from "../../components/Api";

export default class Actionscreen extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Header nav={this.props.navigation} title="Horaires" previous="Home" />
        <View style={styles.page}>
          <DataWorkplay  />
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
  },
});
