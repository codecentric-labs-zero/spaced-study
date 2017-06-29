import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Button,
    ScrollView,
    ToastAndroid
} from 'react-native';


import _ from 'lodash';

import Realm from '../db';
import {CardsListDAO} from '../db';
let realm = Realm;

import CardSetup from "../CardSetup";


export default class SetupScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: '',
            question: '',
            answer: '',
        }
        this.onAdd = this.onAdd.bind(this);
    }

    static navigationOptions = {
        header: false
    };

    componentDidMount() {

        realm.addListener('change', () => {
            this.setState({cards: CardsListDAO.getAllCardsForSetup(realm)})
        });

        this.setState({
            cards: CardsListDAO.getAllCardsForSetup(realm)
        })
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }

    onAdd() {

        if (this.state.question.length > 0 && this.state.answer.length > 0) {
            let card = {question: this.state.question, answer: this.state.answer}
            CardsListDAO.addOrUpdateCard(realm, card)

        } else {
            ToastAndroid.show('Insert question and answer!', ToastAndroid.SHORT);
        }
    }

    render() {
        let cards
        if (this.state.cards.length > 0) {
            cards = _.map(this.state.cards, (card, i) => {
                return (
                    <CardSetup key={i} card={card}>
                    </CardSetup>

                )
            })
        } else {
            cards = <Text style={{alignSelf: 'center'}}>No cards</Text>
        }
        return (
            <View style={styles.mainContainer}>

                <View style={styles.cardsContainer}>
                    <ScrollView>
                        {cards}
                    </ScrollView>
                </View>

                <KeyboardAvoidingView behavior={'height'} style={styles.addContainer}>

                    <Button
                        style={{alignSelf: 'center'}}
                        onPress={() => {
                            this.onAdd()
                        }}
                        title="Add card"
                    />
                    <View style={{padding: 10}}>
                        <Text>Question:</Text>
                        <TextInput
                            style={{padding: 5}}
                            onChangeText={(question) => this.setState({question})
                            }
                        />
                        <Text>Answer:</Text>
                        <TextInput
                            style={{padding: 5}}
                            onChangeText={(answer) => this.setState({answer})
                            }
                        />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardsContainer: {
        flex: 5,
        backgroundColor: 'skyblue',
        alignSelf: 'stretch',
        alignItems: 'stretch'
    },
    addContainer: {
        flex: 2,
        alignSelf: 'stretch',
        alignItems: 'stretch'
    },

});
