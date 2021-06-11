import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Moment from "moment";

import APIKit from "../components/api";

class DataActionView extends Component {
  constructor(props) {
    super(props);
    this.state = { actionData: [], action: "", actionInfo: [] };
  }

  getActionsData() {
        
    let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      };
      APIKit.get("reports/", config)
        .then((res) => {
            const data = res.data;
            Moment.locale("fr");
            this.action = data.shift.map(u => 
                {
                    if(u.id == localStorage.getItem("actionId")){
                        const actionShift = (
                        <View key={u.id} style={{ marginBottom: 10 }}>
                            <Text style={styles.textTitle}>Dans le rapport</Text>
                            <Text style={styles.textTitle}>du {Moment(u.date).format("Y-MM-DD")}</Text>
                            <Text style={styles.textTitle}>à {u.base}</Text>
                        </View>
                        
                        )
                        this.setState({
                            actionData: actionShift
                        })
                    }
                }
            )
        })
  }
  

  getActionDetailsData() {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("user_token"),
      },
    };
    APIKit.get("myactionsinshift/"+localStorage.getItem("actionId"), config)
      .then((res) => {
        const data = res.data;
        Moment.locale("fr");
        console.log(data)
        const actionInfo = data.data.map(u => (
            <View key={u.id} style={styles.container}>
                {   u.day == 0 ? (
                    <Text style={ styles.day}>J</Text>
                ) : (
                    <Text style={ styles.night}>N</Text>
                )}
                <View>
                    <Text style={ styles.text}>{u.action}</Text>
                </View>
                
                <View style={ styles.dateContainer}>
                    <Text style={styles.date}>{u.at}</Text>
                </View>
            </View>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left"
  },
  date: {
    fontSize: 9,
  },

  day: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "white",
    marginRight: 5,
    width: 10,
    height: 20
  },
  night: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "black",
    color: "white",
    marginRight: 5,
    width: 12,
    height: 20
  },



  container: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15
  },
  dateContainer: {
      justifyContent: 'flex-end'
  }
});

export default DataActionView;
