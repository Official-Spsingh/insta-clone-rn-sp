import React, { Component } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native'
import firebase from 'firebase'
import "firebase/firestore";
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
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
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
                            fontSize: 14,
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
                            fontSize: 14,
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
                            fontSize: 14,
                            marginTop: 3,
                            marginRight: 10
                        }}
                    />
                </View>
                <TouchableOpacity onPress={() => this.onSignUp()} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
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
