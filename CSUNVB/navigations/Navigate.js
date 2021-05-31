import {createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React, { Component } from 'react';

import HomeScreen from '../screens/Common/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

import {token} from "../components/api";

const Stack = createStackNavigator();

export default class Navigation extends Component {
    state = {
        userToken: undefined
    };
    
    constructor(props){
        super(props)
    }

    handleTokenUpdate(data){
        console.log('JE SUIS PAS FOU ?', data)
        this.setState({userToken: data})
    }
    
    //TO DO: faire un rechargement de la page a chaque changement de screen

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
                            <Stack.Screen name="Home" component={HomeScreen} options={{
                                headerShown:true
                            }} />  
                        </>
                    )
                }

            </Stack.Navigator>
        )
        
    }
    
}

    