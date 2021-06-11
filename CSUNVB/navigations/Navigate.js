import {createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React, { Component } from 'react';

import HomeScreen from '../screens/Common/HomeScreen';
import ReportScreen from '../screens/Common/ReportScreen';
import ConsultScreen from '../screens/Common/ConsultScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ActionScreen from '../screens/Common/ActionScreen';

const Stack = createStackNavigator();

class Navigation extends Component {
    state = {
        userToken: undefined,
    };
    
    constructor(props){
        super(props)
        this.state =({userToken: localStorage.getItem('user_token')})
        this.handleTokenUpdate = this.handleTokenUpdate.bind(this)
    }

    handleTokenUpdate(data){
        this.setState({userToken: data})
    }

    render(){
        return( 
            
                
                    this.state.userToken == null ? (
                        <>
                        <Stack.Navigator>
                            <Stack.Screen name="Login" options={
                            {headerShown: false}}>
                                {props => <LoginScreen {...props} auth={this.handleTokenUpdate} />}
                            </Stack.Screen> 
                        </Stack.Navigator>
                        </>
                    ) : (
                        <>
                        <Stack.Navigator
                        initialRouteName={localStorage.getItem('nav') == null ? "Home" : localStorage.getItem('nav')}>
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
                            <Stack.Screen name="Action"  options={{
                                headerShown:false
                            }} >  
                                {props => <ActionScreen {...props}  />}
                            </Stack.Screen>
                        </Stack.Navigator>
                        </>
                    )
                
        )
    }
}

export default Navigation

    