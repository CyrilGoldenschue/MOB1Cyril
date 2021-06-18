import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Header from "../../components/header";
import DataAction from "../../components/dataAction";

export default class Actionscreen extends Component {
  constructor(props) {
    super(props),
    (this.state = { actions: [], actionId: "" })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header nav={this.props.navigation} title="Mes actions" />
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
  page: {
    flex: 3,
    marginTop: 20,
  },
});
