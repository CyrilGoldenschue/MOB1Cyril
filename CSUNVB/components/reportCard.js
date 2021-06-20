import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Moment from 'moment';
import { Card } from "react-native-elements";
import { showMessage } from "react-native-flash-message";

import APIKit from "./Api"

class ReportsView extends Component {
    constructor(props) {
        super(props)
        this.state = { reportsPharma: [], reportsNova: [], startNumber: "", endNumber: "" }
    }


    onChangedStartValue(text) {
        let newText = '';

        for (var i = 0; i < text.length; i++) {
            newText = newText + text[i]
            this.setState({ startNumber: newText })
        }

    }

    onChangedEndValue(text) {
        let newText = '';

        for (var i = 0; i < text.length; i++) {
            newText = newText + text[i]
            this.setState({ endNumber: newText })
        }
    }

    onSendReport(data) {

        const onSuccess = () => {
            this.getReportsData()
            showMessage({
                message: "Rapport enregisté !",
                type: "success",
                duration: 6000
            });
            this.setState({ startNumber: "", endNumber: "" })
        };

        const onFailure = error => {
            this.state.endNumber != "" || this.state.startNumber != "" ?
                showMessage({
                    message: "les valeurs inscrites ne sont pas valable merci de mettre des nombres.",
                    type: "danger",
                    duration: 6000
                }) :
                showMessage({
                    message: "Vous ne pouvez pas envoyé ce rapport sans des informations valables.",
                    type: "warning",
                    duration: 6000
                })
            console.log(error && error.response);
        };

        if (this.props.sort == "pharma") {
            const { batch_id, drugsheet_id, date, start, end } = data
            const payload = { batch_id, drugsheet_id, date, start, end }

            payload.start = this.state.startNumber != "" ? this.state.startNumber : data.start == null ? onFailure : (data.start).toString()
            payload.end = this.state.endNumber != "" ? this.state.endNumber : data.end == null ? onFailure : (data.end).toString()

            APIKit.postPharmaCheck(payload)
                .then(onSuccess)
                .catch(onFailure);


        } else if (this.props.sort == "nova") {
            const { nova_id, drug_id, drugsheet_id, date, start, end } = data
            const payload = { nova_id, drug_id, drugsheet_id, date, start, end }


            payload.start = this.state.startNumber != "" ? this.state.startNumber : data.start == null ? onFailure : (data.start).toString()
            payload.end = this.state.endNumber != "" ? this.state.endNumber : data.end == null ? onFailure : (data.end).toString()


            APIKit.postNovaCheck(payload)
                .then(onSuccess)
                .catch(onFailure);
        }

    }



    getReportsData() {

        APIKit.getMissingChecks(localStorage.getItem('base'))
            .then(res => {
                const data = res.data
                Moment.locale("fr")
                const reportsPharma = data.pharma.map(u =>
                    <Card style={styles.cardContainer} containerStyle={styles.back}>
                        <View key={Math.random().toString(36).substr(2, 9)}>
                            <Text style={styles.title}>Du lot {u.batch_number} de  {u.drug}</Text>
                            <Text>Pour le {Moment(u.date).format("D MMM")}</Text>
                            <View style={styles.quantityContainer}>
                                <View>
                                    <View style={styles.quantity}>
                                        <Text style={styles.titleReport}>Matin :</Text>
                                        <TextInput
                                            style={styles.numberInput}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.onChangedStartValue(text)}
                                            maxLength={2}
                                            defaultValue={u.start}
                                        />
                                    </View>
                                    <View style={styles.quantity}>
                                        <Text style={styles.titleReport}>Soir :</Text>
                                        <TextInput
                                            style={styles.numberInput}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.onChangedEndValue(text)}
                                            maxLength={2}
                                            defaultValue={u.end}

                                        />
                                    </View>
                                    <View style={styles.buttonSendArea}>
                                        <TouchableOpacity
                                            activeOpacity={0.95}
                                            style={styles.buttonSend}
                                            onPress={() => {
                                                this.setState({ sort: "pharma" })
                                                this.onSendReport(u)
                                            }}>
                                            <Text style={styles.text}>Envoyer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Card>
                )

                this.setState({
                    reportsPharma: reportsPharma
                })

                const reportsNova = data.nova.map(u =>
                    <Card style={styles.cardContainer} containerStyle={styles.back}>
                        <View key={Math.random().toString(36).substr(2, 9)}>
                            <Text style={styles.title}>Du {u.drug} de la nova {u.nova} </Text>
                            <Text>Pour le {Moment(u.date).format("D MMM")}</Text>
                            <View style={styles.quantityContainer}>
                                <View>
                                    <View style={styles.quantity}>
                                        <Text style={styles.titleReport}>Matin :</Text>
                                        <TextInput
                                            style={styles.numberInput}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.onChangedStartValue(text)}
                                            defaultValue={u.start}
                                            maxLength={2}
                                        />

                                    </View>
                                    <View style={styles.quantity}>
                                        <Text style={styles.titleReport}>Soir : {u.end}</Text>
                                        <TextInput
                                            style={styles.numberInput}
                                            keyboardType='numeric'
                                            onChangeText={(text) => this.onChangedEndValue(text)}
                                            defaultValue={u.end}
                                            maxLength={2}
                                        />
                                    </View>
                                    <View style={styles.buttonSendArea}>
                                        <TouchableOpacity
                                            activeOpacity={0.95}
                                            style={styles.buttonSend}
                                            onPress={() => {
                                                this.setState({ sort: "pharma" })
                                                this.onSendReport(u)
                                            }}>
                                            <Text style={styles.text}>Envoyer</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        </View>
                    </Card>



                )

                this.setState({
                    reportsNova: reportsNova
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    componentDidMount() {
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
        backgroundColor: "#c8c9cc",
        paddingBottom: 10,
        paddingTop: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 10,

    },
    quantity: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: "left",
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
    buttonSend: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 30,
        backgroundColor: '#a4a6a8',
        borderWidth:1,
        borderColor: "black"

    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    },  
    buttonSendArea: {
        marginTop: 20

    },
    titleReport: {
        fontWeight: "bold",
        fontSize: 18,
        width: "90%",
        textAlign: "left"
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
});

export default ReportsView;