import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';
import APIKit from "../components/api"

class PickerView extends Component {
    constructor(props){
        super(props)
        this.state = {bases: []}
    }

    getBasesData() {
        
            APIKit.getBases()
            .then(res => {
                const data = res.data
                const bases = data.map(u =>
                    <Picker.Item label={u.name} value={u.id}  key={ u.id } />
                    )

                    this.setState({
                        bases
                    })

            })
            .catch((error) => {
                console.log(error)
            })
    }
    componentDidMount(){
        this.getBasesData()
    }
  
    render() {
        return (
            <>
            
                {this.state.bases}

            
            </>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  
});

export default PickerView;