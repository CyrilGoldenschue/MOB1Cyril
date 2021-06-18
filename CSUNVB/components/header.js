import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";

class HeaderView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.buttonGoBack}
            onPress={() => {
              localStorage.setItem("nav", this.props.previous);
              localStorage.removeItem("actionId");
              this.props.nav.navigate(this.props.previous);
            }}
          >
            <Image
              style={styles.tinyLogo}
              source={require("./../assets/arrowLeft.png")}
            />
          </TouchableOpacity>
          
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    width: "100%"
  },
  buttonGoBack: {
    width: 50,
    height: 50,
    marginLeft: "2%",
    backgroundColor: "rgb(33, 150, 243)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "2%",
    elevation: 3,
  },
});

export default HeaderView;
