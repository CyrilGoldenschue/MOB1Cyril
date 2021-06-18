import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";

import APIKit from "./Api";

class DataActionView extends Component {
  constructor(props) {
    super(props);
    this.state = { actionData: [], action: "", actionInfo: [] };
  }

  getActionsData() {
    APIKit.getReports().
    then((res) => {
      const data = res.data;
      Moment.locale("fr");
      this.action = data.shift.map((u) => {
        if (u.id == this.props.action) {
          const actionShift = (
            <View key={u.id} style={{ marginBottom: 10 }}>
              <Text style={styles.textTitle}>Dans le rapport</Text>
              <Text style={styles.textTitle}>
                du {Moment(u.date).format("DD MMM Y")}
              </Text>
              <Text style={styles.textTitle}>à {u.base}</Text>
            </View>
          );
          this.setState({
            actionData: actionShift,
          });
        }
      });
    });
  }

  getActionDetailsData() {

    APIKit.getMyActionInShift(this.props.action)
      .then((res) => {
        const data = res.data;
        Moment.locale("fr");
        const actionInfo = data.data.map((u) => (
          <Card style={styles.cardContainer}  containerStyle={u.day == 0 ?  (styles.dayFont) :  (styles.nightFont)}>
            <View style={styles.cardTitleArea}>
              <View style={styles.cardTitle}>
                <Text style={styles.text}>{u.action}</Text>
              </View>
              <View >
                {u.day == 0 ? (
                  <Image
                    style={styles.cardLogo}
                    source={require("./../assets/sun.png")}
                  />
                ) : (
                  <Image
                    style={styles.cardLogo}
                    source={require("./../assets/moon.png")}
                  />
                )}
              </View>
              
            </View>
            <View style={styles.textAction}>
              <Text style={styles.date}>{u.at}</Text>
            </View>
          </Card>
        ));

        this.setState({
          actionInfo: actionInfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getActionsData();
    this.getActionDetailsData();
  }

  render() {
    return (
      <>
        {this.state.actionData}
        {this.state.actionInfo}
      </>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
  },
  textAction: {
    textAlign: "left",
  },
  date: {
    fontSize: 12,
  },
  cardLogo: {
    width: 40,
    height: 40,
  },
  dayFont: {
    backgroundColor: "#f4edc5"
  },
  nightFont: {
    backgroundColor: "#69a0d045"
  },


  cardTitleArea: {
    flexDirection: "row",

  },
  cardTitle: {
    width: "90%"
  },
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
    width: "100%",
  },
});

export default DataActionView;
