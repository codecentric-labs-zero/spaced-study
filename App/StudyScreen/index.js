import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';


import Realm from '../db';
import {CardsListDAO} from '../db';
let realm = Realm;

import _ from 'lodash';

import Ribbon from '../Ribbon'
import Card from '../Card'

export default class StudyScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: '',
            currentCardCounter: 0,
        }

        this._onCorrectAnswer = this._onCorrectAnswer.bind(this);
        this._onIncorrectAnswer = this._onIncorrectAnswer.bind(this);
    }

    static navigationOptions = {
        header: true
    };

    componentDidMount() {
        this.setState({
            cards: CardsListDAO.getCardsForStudy(realm)
        })
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }

    incrementCurrentCardCounter() {

        if (this.state.currentCardCounter <= this.state.cards.length - 1) {
            this.setState({
                currentCardCounter: this.state.currentCardCounter + 1,
            })
        } else {
            this.setState({
                currentCardCounter: 0,
                cards: ''
            })
        }
    }

    _onCorrectAnswer(card) {
        this.incrementCurrentCardCounter();
        CardsListDAO.incrementOrRestartCardLevel(realm, card, true)
    }

    _onIncorrectAnswer(card) {
        this.incrementCurrentCardCounter();
        CardsListDAO.incrementOrRestartCardLevel(realm, card, false)
    }


    render() {

        let card = this.state.cards[this.state.currentCardCounter];
        if (this.state.cards.length > 0 && this.state.currentCardCounter <= this.state.cards.length - 1) {
            currentCard =
                <Card card={card}
                      onCorrectAnswer={this._onCorrectAnswer}
                      onIncorrectAnswer={this._onIncorrectAnswer}></Card>
        } else {
            currentCard = <Text>No cards</Text>
        }
        return (
            <View style={styles.mainContainer}>
                <Ribbon/>

                <View style={styles.cardsContainer}>
                    {currentCard}
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
    cardsContainer: {
        flex: 5,
        backgroundColor: 'skyblue',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
