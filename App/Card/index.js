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
                <View style={{flex: 1,}}>

                    <View style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                    }}>
                        <View style={{alignItems: 'center'}}>
                            <ScrollView>
                                <Text>{this.props.card.answer}</Text>
                            </ScrollView>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>

                        <View style={{flex: 1}}>
                            <Button
                                onPress={() => {
                                    this.handleShow();
                                    this.props.onCorrectAnswer(this.props.card);
                                }}
                                title="I was correct"
                                color='green'
                            />
                        </View>

                        <View style={{flex: 1}}>
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
        let borderRadiusWidthForAnswers = this.state.showAnswer ? 6 : 0;

        return (
            <View style={{flex: 1, margin: 10}}>

                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#EDE6E3',
                    alignSelf: 'stretch',
                    borderRadius: 6
                }}>
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <ScrollView>

                            <Text>
                                {this.props.card.question}
                            </Text>

                        </ScrollView>
                    </View>
                </View>

                <View style={{
                    flex: 1,
                    padding: 10,
                    marginTop: 5,
                    backgroundColor: backgroundColorForAnswer,
                    borderRadius: borderRadiusWidthForAnswers
                }}>
                    {cardBottom}
                </View>
            </View>
        )
    }
}