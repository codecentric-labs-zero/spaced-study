import React, {Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

import Realm from '../db';
import {CardsListDAO} from '../db';
let realm = Realm;

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
            level = <Text>level: {this.props.card.level}</Text>
        } else {
            level = <Text style={{color: 'green'}}>level: {this.props.card.level}</Text>
        }

        return (

            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text>
                        {this.props.card.question}
                    </Text>

                    <Text>
                        {this.props.card.answer}
                    </Text>
                </View>
                {level}
                <Button
                    title="x"
                    onPress={() => {
                        this.onRemove(this.props.card.id)
                    }}
                ></Button>
            </View>
        )
    }
}