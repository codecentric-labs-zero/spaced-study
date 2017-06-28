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
                <View>
                    <Text>{this.props.answer}</Text>

                    <Button
                        onPress={() => {
                            this.handleShow()
                        }}
                        title="I was correct"
                    />

                    <Button
                        onPress={() => {
                            this.handleShow()
                        }}
                        title="I did not know the answer"
                    />
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
            <View>
                <Text>
                    {this.props.question}
                </Text>
                {cardBottom}
            </View>
        )
    }
}