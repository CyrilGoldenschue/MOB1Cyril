import {createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React, { Component } from 'react';

import HomeScreen from '../screens/Common/HomeScreen';
import ReportScreen from '../screens/Common/ReportScreen';
import ConsultScreen from '../screens/Common/ConsultScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

import {token} from "../components/api";

const Stack = createStackNavigator();

class Navigation extends Component {
    state = {
        userToken: undefined
    };
    
    constructor(props){
        super(props)
        this.state =({userToken: localStorage.getItem('user_token')})
        this.handleTokenUpdate = this.handleTokenUpdate.bind(this)
    }

    handleTokenUpdate(data){
        console.log('JE SUIS PAS FOU ?', data)
        this.setState({userToken: data})
    }

    render(){
        return( 
            <Stack.Navigator>
                {
                    this.state.userToken == null ? (
                        <>
                            <Stack.Screen name="Login" options={
                            {headerShown: false}}>
                                {props => <LoginScreen {...props} auth={this.handleTokenUpdate} />}
                                </Stack.Screen> 
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home"  options={{
                                headerShown:false
                            }} >  
                                {props => <HomeScreen {...props} auth={this.handleTokenUpdate}  />}
                            </Stack.Screen>
                            <Stack.Screen name="Report"  options={{
                                headerShown:false
                            }} >  
                                {props => <ReportScreen {...props}  />}
                            </Stack.Screen>
                            <Stack.Screen name="Consult"  options={{
                                headerShown:false
                            }} >  
                                {props => <ConsultScreen {...props}  />}
                            </Stack.Screen>
                        </>
                    )
                }
            </Stack.Navigator>
        )
    }
}

export default Navigation

    