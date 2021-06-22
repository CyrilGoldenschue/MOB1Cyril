import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import React, { Component } from "react";

import HomeScreen from "../screens/Common/HomeScreen";
import ReportScreen from "../screens/Common/ReportScreen";
import ConsultScreen from "../screens/Common/ConsultScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import ActionScreen from "../screens/Common/ActionScreen";
import WorkplanScreen from "../screens/Common/WorkplanScreen";

const Stack = createStackNavigator();

class Navigation extends Component {
  state = {
    userToken: undefined,
  };

  constructor(props) {
    super(props);
    this.state = { userToken: localStorage.getItem("user_token"), action: localStorage.getItem("actionId") };
    this.handleTokenUpdate = this.handleTokenUpdate.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
  }

  handleTokenUpdate(data) {
    this.setState({ userToken: data });
  }

  handleActionUpdate(data) {
    this.setState({ action: data });
  }

  render() {
    return (
      
        this.state.userToken == null ? (
        <>
          <Stack.Navigator>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => (
                <LoginScreen {...props} auth={this.handleTokenUpdate} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </>
        ) : (
        <>
          <Stack.Navigator
            initialRouteName={
              localStorage.getItem("nav") == null
                ? "Home"
                : localStorage.getItem("nav")
            }
          >
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
            >
              {(props) => (
                <HomeScreen {...props} auth={this.handleTokenUpdate} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Report"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <ReportScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Consult"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <ConsultScreen {...props} actionId={this.handleActionUpdate} />}
            </Stack.Screen>
            <Stack.Screen
              name="Action"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <ActionScreen {...props} action={this.state.action} actionId={this.handleActionUpdate} />}
            </Stack.Screen>
            <Stack.Screen
              name="Workplan"
              options={{
                headerShown: false,
              }}
            >
              {(props) => <WorkplanScreen {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </>
        )
      
    );
  }
}


export default Navigation;
