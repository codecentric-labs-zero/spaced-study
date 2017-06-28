import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';


import Ribbon from '../Ribbon'

export default class StudyScreen extends Component {
    static navigationOptions = {
        header: true
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                <Ribbon/>

                <Text>Study here</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
