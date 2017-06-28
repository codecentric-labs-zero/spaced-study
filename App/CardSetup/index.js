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

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', margin: 5}}>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text>
                        {this.props.question}
                    </Text>
                    <Text>
                        {this.props.answer}
                    </Text>
                </View>
                <Button
                    title="x"
                    onPress={() => {
                        this.onRemove(this.props.id)
                    }}
                ></Button>
            </View>
        )
    }
}