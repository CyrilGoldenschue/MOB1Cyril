import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";
import Moment from "moment";
import { showMessage } from "react-native-flash-message";

import APIKit from "./Api";

class DataActionView extends Component {
  constructor(props) {
    super(props);
    this.state = { workplanData: "", workplanInfo: [], reason: null };
  }

  onChangedReasonValue(text) {
    let newText = "";

    for (var i = 0; i < text.length; i++) {
      newText = newText + text[i];
      this.setState({ reason: newText });
    }
  }

  countWorkPlanData() {
    APIKit.getUnconfirmedWorkPlan()
      .then((res) => {
        const dataWorkPlan = res.data;
        const workplanData = (
          dataWorkPlan.length != 0 ?(
          <Text style={styles.textWorkplan}>
            Il reste {dataWorkPlan.length} horaires à remplir
          </Text>
          ) : (
            <Text style={styles.textWorkplan}>
            Vous avez confirmé tous vos horaires
          </Text>
          )
        );
        this.setState({
          workplanData: workplanData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  onSendWorkplan(data, status) {

    const onSuccess = () => {
      this.getWorkPlanData()
      this.countWorkPlanData()
        showMessage({
            message: "horaire confirmé !",
            type: "success",
            duration: 6000
        });
        this.setState({isSpeak: false})
    };

    const onFailure = error => {
      //TODO voir si j'ai le temps de faire les exeption
        /*this.state.reason.length <= 10 || this.state.reason.length >= 50 ?
            showMessage({
                message: "La raison a trop de caractère ou pas assez.",
                type: "danger",
                duration: 6000
            }) : ""*/
        console.log(error && error.response);
    };

        const { id, confirmation, reason } = data
        const payload = { id, confirmation, reason }

        status != 1 ? (
          payload.reason = this.state.reason != null ? this.state.reason : "")
        : ""
        payload.confirmation = status

        APIKit.postConfirmWorkPlan(payload)
            .then(onSuccess)
            .catch(onFailure);

}



  getWorkPlanData() {
    APIKit.getUnconfirmedWorkPlan()
      .then((res) => {
        const dataWorkPlan = res.data;
        Moment.locale("fr");
        const workplanInfo = dataWorkPlan.map((u) => (
          <Card
            key={u.id}
            style={styles.cardContainer}
            containerStyle={
              u.worktime.day == 0 ? styles.dayFont : styles.nightFont
            }
          >
            <View style={styles.cardTitleArea}>
              <View style={styles.cardTitle}>
                <Text style={styles.text}>
                  Horaire de type : {u.worktime.type}
                </Text>
                
                  <View style={styles.reasonArea}>
                    <Text style={styles.text}>raison : </Text>
                    <TextInput
                      style={styles.textInput}
                      onChangeText={(text) => this.onChangedReasonValue(text)}
                      defaultValue={u.reason}
                      multiline={true}
                      numberOfLines={4}
                      maxLength={50}
                    ></TextInput>
                  </View>
              
                <Text style={styles.text}>
                  pour le {Moment(u.date).format("DD MMMM Y")}
                </Text>
              </View>
              <View>
                {u.worktime.day == 0 ? (
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
            <View style={styles.buttonSendArea}>
              <TouchableOpacity
                activeOpacity={0.95}
                style={styles.buttonSend}
                onPress={() => {
                  this.onSendWorkplan(u, 1);
                }}
              >
                <Text style={styles.textButton}>Confirmer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.95}
                style={styles.buttonSend}
                onPress={() => {
                  this.onSendWorkplan(u, 0);
                }}
              >
                <Text style={styles.textButton}>A discuter</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ));
        this.setState({
          workplanInfo: workplanInfo,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getWorkPlanData(); 
    this.countWorkPlanData();
  }

  render() {
    return (
      <>
        {this.state.workplanData}
        {this.state.workplanInfo}
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
  textButton: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    fontSize: 12,
  },
  cardLogo: {
    width: 40,
    height: 40,
  },
  dayFont: {
    backgroundColor: "#f4edc5",
  },
  nightFont: {
    backgroundColor: "#69a0d045",
  },

  cardTitleArea: {
    flexDirection: "row",
  },
  cardTitle: {
    width: "90%",
  },
  cardContainer: {
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 15,
    width: "100%",
  },
  buttonSendArea: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  textInput: {
    width: "90%",
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
  },
  buttonSend: {
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: "#a4a6a8",
    textAlign: "center",
    width: 150,
    height: 30,
  },
  reasonArea: {
    flexDirection: "column",
  },
  buttonCheck: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "rgb(33, 150, 243)",
    width: 150,
    height: 30,
  },
  
  textWorkplan: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default DataActionView;
