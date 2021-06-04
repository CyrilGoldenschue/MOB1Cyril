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
        
        APIKit.get('bases', {})
            .then(res => {
                const data = res.data
                const bases = data.map(u =>
                    <Picker.Item label={u.name} value={u.id}  key={ Math.random().toString(36).substr(2, 9) } />
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
            <Picker style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.selectedValue = itemValue}
            >
                {this.state.bases}
            </Picker>

            
            </>
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