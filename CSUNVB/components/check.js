import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import APIKit from "../components/api"

class ReportsView extends Component {
    constructor(props){
        super(props)
        this.state = {reports: []}
    }    

    onChanged1(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            text = text.replace(/[^0-9]/g, '')
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
                this.setState({ myNumber1: newText });
            }
        }
    }

    onChanged2(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            text = text.replace(/[^0-9]/g, '')
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
                this.setState({ myNumber2: newText });
            }
        }
    }

    getReportsData() {
        
        console.log('missingchecks/'+localStorage.getItem("base"))
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("user_token")
            }
          }
        APIKit.get('missingchecks/'+localStorage.getItem("base"), config)
            .then(res => {
                const data = res.data
                const reports = data.pharma.map(u =>
                    <View style={styles.back} key={ Math.random().toString(36).substr(2, 9) }>
                        <Text>Du lot {u.batch_number} de  {u.drug}</Text>
                        <Text>Pour le {u.date}</Text>
                        <View style={styles.quantity}>
                            <Text>Matin :</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' // This prop help to open numeric keyboard
                                onChangeText={(text)=>this.onChanged1(text)}
                                value={u.start === null ? "" : u.start}
                                maxLength={2}
                            />
                            
                            <Text>Soir : {u.end}</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' // This prop help to open numeric keyboard
                                onChangeText={(text)=>this.onChanged2(text)}
                                value={u.end === null ? "" : u.end}
                                maxLength={2}
                            />
                            <TouchableOpacity 
                                activeOpacity={0.95} 
                                style={styles.buttonSend} 
                                onPress={() => {
                                    this.setState({sort: "pharma"})
                                }}>
                                    <Text style={styles.text}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    )

                    this.setState({
                        reports
                    })

            })
            .catch((error) => {
                console.log(error)
            })
    }
    componentDidMount(){
        this.getReportsData()
    }
  
    render() {
        return (
            <>
            
                {this.state.reports}

            
            </>
        );
    }
}

const styles = StyleSheet.create({
  back: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'gray', 
    backgroundColor: "#a4a6a8",
    paddingBottom: 10,
    paddingTop: 10,
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: 10,
  },
  numberInput: {
    height: 30,
    width: "20%",
    borderColor: 'gray', 
    backgroundColor: "white",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonSend:{
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#c8c9cc',
    
  },
  
});

export default ReportsView;