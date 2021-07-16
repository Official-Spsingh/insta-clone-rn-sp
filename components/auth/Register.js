import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native'
import firebase from 'firebase'
import "firebase/firestore";
import axios from "axios"
export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

    }
    onSignUp = () => {
        const { email, password, name } = this.state;
        let userData = {
            "name": name,
            "email": email,
            "password": password
        }
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         firebase.firestore().collection("users")
        //             .doc(firebase.auth().currentUser.uid)
        //             .set({
        //                 name,
        //                 email
        //             })
        //         console.log(result)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        axios.post("http://localhost:4000/user/signup", userData).then(res => {
            if (res?.data?.message) {
                this.setState({
                    errorMessage: res.data.message
                })
            }
            else {
                console.log(res)
                this.props.loginSignupSuccess(res.data.token)
            }
        }).catch(err => {
            console.log(err)
            this.setState({
                errorMessage: "Something went wrong"
            })
        })
    }
    render() {
        return (
            <View style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                <View style={{
                    backgroundColor: '#f4f6f8',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginVertical: 5,
                }}>
                    <TextInput
                        placeholder="Name"
                        onChangeText={(name) => this.setState({ name })}
                        style={{
                            color: '#353031',
                            fontWeight: 'bold',
                            fontSize: 18,
                            height: 32,
                            marginTop: 3,
                            marginRight: 10
                        }}
                    />
                </View>
                <View style={{
                    backgroundColor: '#f4f6f8',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginVertical: 5,
                }}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                        style={{
                            color: '#353031',
                            fontWeight: 'bold',
                            fontSize: 18,
                            height: 32,
                            marginTop: 3,
                            marginRight: 10
                        }}
                    />
                </View>
                <View style={{
                    backgroundColor: '#f4f6f8',
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    marginVertical: 5,
                }}>
                    <TextInput
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                        style={{
                            color: '#353031',
                            fontWeight: 'bold',
                            fontSize: 18,
                            height: 32,
                            marginTop: 3,
                            marginRight: 10
                        }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.onSignUp()} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: 'red' }}>{this.state.errorMessage}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E33E5C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
})

export default Register
