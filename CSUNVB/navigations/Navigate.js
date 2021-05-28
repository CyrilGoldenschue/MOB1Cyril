import {createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, { Component } from 'react';

import HomeScreen from '../screens/Common/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
export default class Navigation extends Component {
    constructor(props){
        super(props),
        this.state = {userToken: null}      
    }

    render(){

        return( 
            <NavigationContainer>
                <AuthStack.Navigator  
                initialRouteName="Login" 
                screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Login" component={LoginScreen}  />     
                    <Stack.Screen name="Home" component={HomeScreen}  />      
                </AuthStack.Navigator>
            </NavigationContainer>
        )
        
    }
    
}

    