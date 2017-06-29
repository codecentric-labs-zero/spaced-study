import React, {Component} from 'react';
import {
    Text,
    View,
    Button,
    ScrollView
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
                <View style={{flex: 1}}>
                    <View style={{flex: 2, alignSelf: 'center', justifyContent: 'center'}}>
                        <ScrollView>
                            <Text>{this.props.card.answer}</Text>
                        </ScrollView>
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

        let backgroundColorForAnswer = this.state.showAnswer ? '#DADAD9' : 'skyblue';
        let borderWidthForAnswers = this.state.showAnswer ? 1 : 0;
        let borderRadiusWidthForAnswers = this.state.showAnswer ? 4 : 0;

        return (
            <View style={{flex: 1, margin: 10}}>

                <View style={{
                    flex: 1,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#EDE6E3',
                    borderWidth: 1,
                    borderRadius: 4
                }}>
                    <ScrollView>
                        <Text>
                            {this.props.card.question}
                        </Text>
                    </ScrollView>
                </View>

                <View style={{
                    flex: 1,
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: backgroundColorForAnswer,
                    borderWidth: borderWidthForAnswers,
                    borderRadius: borderRadiusWidthForAnswers
                }}>
                    {cardBottom}
                </View>
            </View>
        )
    }
}