import React from 'react'
import { Text, View, Button, Image, TouchableOpacity, StyleSheet } from 'react-native'
export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'center', width: '50%', marginLeft: '25%', marginRight: '25%' }}>
                <Image
                    style={{
                        aspectRatio: 3 / 1,
                        width: '100%'
                    }}
                    source={{ uri: 'https://1000logos.net/wp-content/uploads/2017/02/ig-logo.png' }}
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            {/* <View style={{  }}>
                <Button title="Login" onPress={() => navigation.navigate('Login')} />
            </View> */}
            <View style={{ flex: 1, justifyContent: 'flex-start', width: '50%', marginLeft: '25%', marginRight: '25%', marginTop: 10 }}>
                <Text>Didn't have account? <Text style={{ color: '#E33E5C' }} onPress={() => navigation.navigate('Register')}>Signup</Text></Text>
            </View>

        </View >
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E33E5C',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
        width: '50%',
        marginLeft: '25%',
        marginRight: '25%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    }
})
