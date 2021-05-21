import React, { Component, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

class PickerView extends Component {

    

    constructor(props){
        super(props)
        this.state = {bases: []}
    }

    getBasesData() {
        console.log("start", this.state.bases)
        axios
            .get(`http://127.0.0.1:8000/api/bases`, {})
            .then(res => {
                const data = res.data
                console.log("data:", data)
                const bases = data.map(u =>
                    <Picker.Item label={u.name} value={u.id} />
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
            <View>
            <Picker style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.selectedValue = itemValue}
            >
                {this.state.bases}
            </Picker>

            
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  picker: {
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    height: 50,
  }
});

export default PickerView;