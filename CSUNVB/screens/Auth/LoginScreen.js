import React, { Component } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";

import PickerView from "../../components/Picker";
import APIKit from "../../components/Api";

class LoginScreen extends Component {
  constructor(props) {
    super(props),
      (this.state = { initials: "", password: "", base: "", message: "" });
  }

  onInitialsChange = (initials) => {
    this.setState({ initials: initials });
  };

  onPasswordChange = (password) => {
    this.setState({ password: password });
  };

  onPressLogin() {
    const { initials, password } = this.state;
    const payload = { initials, password };

    const onSuccess = ({ data }) => {
      this.setState({ userToken: data.token });
      localStorage.setItem("user_token", this.state.userToken);
      localStorage.setItem("base", this.state.base);
      localStorage.setItem("nav", "Home");
      this.props.auth(data.token);
    };

    const onFailure = (error) => {
      console.log(error && error.response);
      showMessage({
        message: "Les initiales ou le mot de passe est incorrect.",
        type: "danger",
        duration: 6000
      });
    };
    this.state.base == "" ? 
    showMessage({
      message: "aucune base n'a été sélectionnée.",
      type: "warning",
      duration: 6000
    }) : APIKit.getToken(payload).then(onSuccess).catch(onFailure);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <SafeAreaView>
            <Text style={styles.text}>Initiales</Text>
            <TextInput
              style={styles.input}
              onChangeText={this.onInitialsChange}
            ></TextInput>
            <Text style={styles.text}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={this.onPasswordChange}
            ></TextInput>
            <Text style={styles.text}>Base</Text>
            <Picker
              style={styles.picker}
              selectedValue={(this.state.base) || '0'}
              onValueChange={(value) => this.setState({ base: value })}
            >
              <Picker.Item
                label="--- Choissez ---"
                value="0"
                selected
                key={Math.random().toString(36).substr(2, 9)}
              ></Picker.Item>
              <PickerView />
            </Picker>
            <View style={[{ width: "50%", marginLeft: "25%" }]}>
              <Button
                size={15}
                color="blue"
                onPress={this.onPressLogin.bind(this)}
                title="Se connecter"
              />
            </View>
          </SafeAreaView>
          <Text style={{fontWeight: "bold"}}>Version: eval CGE</Text>
        </ImageBackground>
      </View>
    );
  }
}

const image = {
  uri: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2t5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
};

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
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFFFFF",

    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
  picker: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  },
});

export default LoginScreen;
