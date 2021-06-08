import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Moment from 'moment';

import APIKit from "../components/api"

class ReportsView extends Component {
    constructor(props){
        super(props)
        this.state = {reportsPharma: [], reportsNova: [], myNumber1: "", myNumber2: ""}

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

    onSendReport(data){
        console.log(this.props.sort)
        console.log(data)
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("user_token")
            }
          }
        if(this.props.sort == "pharma"){
            const {batch_id, drugsheet_id, date, start, end} = data
            const payload = {batch_id, drugsheet_id, date, start, end}

            
            payload.start = this.state.myNumber1 != "" ? parseInt(this.state.myNumber1) : data.start
            payload.end = this.state.myNumber2 != "" ? parseInt(this.state.myNumber2) : data.end
            
            console.log(payload)
            //APIKit.get('pharmacheck/', config, )



          }else if(this.props.sort == "nova"){
            const {nova_id, drugsheet_id, date, start, end} = data
            const payload = {nova_id, drugsheet_id, date, start, end}

            
            payload.start = this.state.myNumber1 != "" ? parseInt(this.state.myNumber1) : data.start
            payload.end = this.state.myNumber2 != "" ? parseInt(this.state.myNumber2) : data.end
            
            console.log(payload)
           //APIKit.get('novacheck/', config)



          }
    }

    

    getReportsData() {
    
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("user_token")
            }
          }
        APIKit.get('missingchecks/'+localStorage.getItem("base"), config)
            .then(res => {
                const data = res.data
                Moment.locale("fr")
                const reportsPharma = data.pharma.map(u =>
                    <View style={styles.back} key={ Math.random().toString(36).substr(2, 9) }>
                        <Text style={styles.titleReport}>Du lot {u.batch_number} de  {u.drug}</Text>
                        <Text>Pour le {Moment(u.date).format("D MMM")}</Text>
                        <View style={styles.quantity}>
                            <Text style={styles.titleReport}>Matin :</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' // This prop help to open numeric keyboard
                                onChangeText={(text)=>this.onChanged1(text)}
                                maxLength={2}
                                defaultValue={u.start}
                            />
                            
                            <Text style={styles.titleReport}>Soir :</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' // This prop help to open numeric keyboard
                                onChangeText={(text)=>this.onChanged2(text)}
                                maxLength={2}
                                defaultValue={u.end}
                                
                            />
                            <TouchableOpacity 
                                activeOpacity={0.95} 
                                style={styles.buttonSend} 
                                onPress={() => {
                                    this.setState({sort: "pharma"})
                                    this.onSendReport(u)
                                }}>
                                    <Text style={styles.text}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    )

                    this.setState({
                        reportsPharma: reportsPharma
                    })

                const reportsNova = data.nova.map(u =>
                    <View style={styles.back} key={ Math.random().toString(36).substr(2, 9) }>
                        <Text style={styles.titleReport}>Du {u.drug} de la nova {u.nova} </Text>
                        <Text>Pour le {Moment(u.date).format("D MMM")}</Text>
                        <View style={styles.quantity}>
                            <Text style={styles.titleReport}>Matin :</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' 
                                onChangeText={(text)=>this.onChanged1(text)}
                                defaultValue={u.start}
                                maxLength={2}
                            />
                            
                            <Text style={styles.titleReport}>Soir : {u.end}</Text>
                            <TextInput
                                style={styles.numberInput}
                                keyboardType='numeric' 
                                onChangeText={(text)=>this.onChanged2(text)}
                                defaultValue={u.end}
                                maxLength={2}
                            />
                            <TouchableOpacity 
                                activeOpacity={0.95} 
                                style={styles.buttonSend} 
                                onPress={() => {
                                    this.setState({sort: "pharma"})
                                    this.onSendReport(u)
                                }}>
                                    <Text style={styles.text}>Envoyer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    )

                    this.setState({
                        reportsNova: reportsNova
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
                { 
                this.props.sort == "pharma" ? this.state.reportsPharma : ""
                }
                {
                this.props.sort == "nova" ? this.state.reportsNova : ""
                }

                
            
                

            
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
  titleReport: {
      fontWeight: "bold",
      fontSize: 18,
  }
  
});

export default ReportsView;