import React, {Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
        }
    }


    handleShow() {
        this.setState({
            showAnswer: !this.state.showAnswer
        });
    }

    render() {
        let cardBottom = null;

        if (this.state.showAnswer) {
            cardBottom =
                <View style={{flex: 1, margin: 15}}>
                    <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center',}}>
                        <Text>{this.props.card.answer}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={{marginVertical: 5}}>
                            <Button
                                onPress={() => {
                                    this.handleShow();
                                    this.props.onCorrectAnswer(this.props.card);
                                }}
                                title="I was correct"
                                color='green'
                            />
                        </View>
                        <View style={{marginVertical: 5}}>
                            <Button
                                onPress={() => {
                                    this.handleShow();
                                    this.props.onIncorrectAnswer(this.props.card);
                                }}
                                title="I was wrong"
                                color='red'
                            />
                        </View>
                    </View>
                </View>

        } else {
            cardBottom = <Button
                onPress={() => {
                    this.handleShow()
                }}
                title="Show answer"
            />
        }

        return (
            <View style={{flex: 1, margin: 15}}>
                <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center',}}>
                    <Text>
                        {this.props.card.question}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    {cardBottom}
                </View>
            </View>
        )
    }
}