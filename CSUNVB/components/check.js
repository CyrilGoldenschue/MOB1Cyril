import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import APIKit from "../components/api"

class ReportsView extends Component {
    constructor(props){
        super(props)
        this.state = {reports: []}
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
                    {console.log(u)},
                    
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
  container: {
    alignItems: "center"
  },
  
});

export default ReportsView;