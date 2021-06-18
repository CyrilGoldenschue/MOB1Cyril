import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Moment from "moment";

import APIKit from "./Api";

class ConsultationView extends Component {
  constructor(props) {
    super(props);
    this.state = { reportsGarde: [], reportsStup: [] };
  }
  getReportsData() {
    APIKit.getReports()
      .then((res) => {
        const data = res.data;
        Moment.locale("fr");
        const reportsGarde = data.shift.map((u) => (
          <View key={u.id} style={{ marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                localStorage.setItem("nav", "Action");
                //TODO Code moche à trouver comment faire ça correctement
                localStorage.setItem("actionId",  u.id);
                this.props.nav.navigate("Action" );
              }}
            >
              <Text style={{ textAlign: "left" }}>
                Pour le {Moment(u.date).format("Y-MM-DD")} à {u.base}
              </Text>
            </TouchableOpacity>
          </View>
        ));

        this.setState({
          reportsGarde: reportsGarde,
        });

        const reportsStup = data.drug.map((u) => (
          <View key={u.id} style={{ marginBottom: 10 }}>
            <Text style={{ textAlign: "left" }}>
              Semaine {u.week} à {u.base}
            </Text>
          </View>
        ));

        this.setState({
          reportsStup: reportsStup,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getReportsData();
  }

  render() {
    return (
      <>
        {this.props.sort == "garde" ? this.state.reportsGarde : ""}
        {this.props.sort == "stup" ? this.state.reportsStup : ""}
      </>
    );
  }
}

const styles = StyleSheet.create({
  titleReport: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ConsultationView;
