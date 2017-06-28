import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

import {StackNavigator} from 'react-navigation';


import Ribbon from './Ribbon'

import SetupScreen from './SetupScreen'
import StudyScreen from './StudyScreen'

// ignore warning from keyboardavoidingview
console.ignoredYellowBox = ['Warning: checkPropTypes'];

export default class SpaceStudy extends Component {
    static navigationOptions = {
        header: false,
    };

    render() {

        const {navigate} = this.props.navigation;


        return (
            <View style={styles.mainContainer}>
                <Ribbon/>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignSelf: 'stretch',
                    alignItems: 'stretch',
                }}>

                    <View style={{margin: 15}}>
                        <Button
                            onPress={() => navigate('SetupScreen')}
                            title="Setup cards"
                        />
                    </View>
                    <View style={{margin: 15}}>
                        <Button
                            onPress={() => navigate('StudyScreen')}
                            title="Study"
                        />
                    </View>
                </View>

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

const SpaceStudyApp = StackNavigator({
    Home: {screen: SpaceStudy},
    SetupScreen: {screen: SetupScreen},
    StudyScreen: {screen: StudyScreen},
});


AppRegistry.registerComponent('spaceStudy', () => SpaceStudyApp);
