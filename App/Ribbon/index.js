import React, {Component} from 'react';
import {
    Text,
    View
} from 'react-native';

export default class Ribbon extends Component {
    render() {
        return (
            <View style={{
                position: 'absolute',
                height: 30, width: 300,
                right: -105, top: 30,
                transform: [{rotate: '45deg'}],
                zIndex: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                borderColor: 'grey', borderWidth: 1
            }}>
                <Text style={{textAlign: 'center', color: 'grey'}}>Built in a day</Text>
            </View>)
    }
}