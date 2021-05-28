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