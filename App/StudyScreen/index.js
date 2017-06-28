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
        }
    }

    static navigationOptions = {
        header: true
    };

    componentDidMount() {

        realm.addListener('change', () => {
            this.setState({cards: CardsListDAO.getAllCars(realm)})
        });

        this.setState({
            cards: CardsListDAO.getAllCars(realm)
        })
    }

    componentWillUnmount() {
        realm.removeAllListeners();
    }


    render() {

        let cards
        if (this.state.cards.length > 0) {
            cards = _.map(this.state.cards, (card, i) => {
                return (
                    <Card key={i} question={card.question} answer={card.answer}>
                    </Card>

                )
            })
        } else {
            cards = <Text>No cards</Text>
        }
        return (
            <View style={styles.mainContainer}>
                <Ribbon/>

                <View style={styles.cardsContainer}>
                    <ScrollView>
                        {cards}
                    </ScrollView>
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
        alignItems: 'stretch'
    },
});
