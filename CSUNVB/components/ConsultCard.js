import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import Moment from "moment";

import APIKit from "./Api";
import { Card } from "react-native-elements";

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
          <Card style={styles.cardContainer}>
            <View key={u.id} style={styles.cardTitleArea}>
              <View  style={styles.cardTitle} >
                <Text>
                  Pour le {Moment(u.date).format("Y-MM-DD")} à {u.base}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.95}
                  style={styles.squareButton}
                  onPress={() => {
                    localStorage.setItem("actionId", u.id)
                    this.props.actionId(u.id)
                    this.props.nav.navigate("Action");
                  }}
                >
                  <Image
                    style={styles.cardLogo}
                    source={require("./../assets/details.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ));

        this.setState({
          reportsGarde: reportsGarde,
        });

        const reportsStup = data.drug.map((u) => (
          <Card style={styles.cardContainer}>
            <View key={u.id} style={{ marginBottom: 10 }}>
              <Text style={{ textAlign: "left" }}>
                Semaine {u.week} à {u.base}
              </Text>
            </View>
          </Card>
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
  squareButton: {
    backgroundColor: "rgb(33, 150, 243)",
    width: 30,
    height: 30
  },
  cardLogo: {
    width: 30,
    height: 30,
  },
  cardTitleArea: {
    flexDirection: "row",
  },
  cardTitle: {
    width: "90%",
    textAlign: "left"
  },
  cardContainer: {
    flexDirection: "row",
    width: "100%",
  },
});

export default ConsultationView;
