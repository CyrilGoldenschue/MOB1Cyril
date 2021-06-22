import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Header from "../../components/Header";
import DataWorkplay from "../../components/WorkplanCard";

export default class Actionscreen extends Component {
  constructor(props) {
    super(props),
      (this.state = { actions: [] })
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
