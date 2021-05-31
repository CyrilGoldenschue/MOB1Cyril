import {createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React, { Component } from 'react';

import HomeScreen from '../screens/Common/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

import {token} from "../components/api";

const Stack = createStackNavigator();

class Navigation extends Component {
    state = {
        userToken: undefined
    };
    
    constructor(props){
        super(props)

        this.handleTokenUpdate = this.handleTokenUpdate.bind(this)
    }

    handleTokenUpdate(data){
        console.log('JE SUIS PAS FOU ?', data)
        this.setState({userToken: data})
    }
    
   //TODO changer le nom du props

    render(){
        return( 
            <Stack.Navigator>
                {
                    this.state.userToken == null ? (
                        <>
                            <Stack.Screen name="Login" options={
                            {headerShown: false}}>
                                {props => <LoginScreen {...props} miaou={this.handleTokenUpdate} />}
                                </Stack.Screen> 
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home"  options={{
                                headerShown:true
                            }} >  
                                {props => <HomeScreen {...props} miaou={this.handleTokenUpdate} />}
                            </Stack.Screen>
                        </>
                    )
                }
            </Stack.Navigator>
        )
    }
}

export default Navigation

    