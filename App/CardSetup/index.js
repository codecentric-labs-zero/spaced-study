import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
} from 'react-native';

import Realm from '../db';
import {CardsListDAO} from '../db';
let realm = Realm;

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CardSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.onRemove = this.onRemove.bind(this)
    }

    onRemove(id) {
        CardsListDAO.removeCard(realm, id)
    }

    render() {


        let level;
        if (this.props.card.level < 7) {
            level = <Text style={{color: '#d9534f', marginHorizontal: 15}}>level: {this.props.card.level}</Text>
        } else {
            level = <Text style={{color: '#5cb85c', marginHorizontal: 15}}>level: {this.props.card.level}</Text>
        }

        return (

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5, borderWidth: 1, padding: 5}}>
                <View style={{flex: 1, flexDirection: 'column'}}>

                    <Text>Question: {'\n'}
                        {'\t' + this.props.card.question}
                    </Text>
                    <View style={{borderBottomWidth: 1}}/>
                    <Text>Answer: {'\n'}
                        {'\t' + this.props.card.answer}
                    </Text>
                </View>
                {level}
                <View style={{flexDirection: 'column'}}>

                    <Icon name="delete" size={30} color="#900"
                          onPress={() => {
                              this.onRemove(this.props.card.id)
                          }}/>
                </View>
            </View>
        )
    }
}