import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import Header from "../../components/Header";
import DataAction from "../../components/ActionCard";

export default class Actionscreen extends Component {
  constructor(props) {
    super(props),
    (this.state = { actions: [] })
  }

  render() {

let action = this.props.action
    return (
      <View style={styles.container}>
        <Header nav={this.props.navigation} title="Mes actions" previous="Consult" />
        <View style={styles.page}>
          <DataAction action={action} />
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
