import React, { Component } from "react";

import { View } from "react-native";

import { images } from '../../../utilities';

import {
    Container,
    TypeTitle,
    TypeDescription,
    TypeImage,
    RequestButton,
    RequestButtonText
} from "./DetailsStyles";

// const timeOver = false;
const firstMessage = {
    title: 'Your route was successfully received!',
    message: 'Looking for a avaliable tow for you ...'
}
const secondMessage = {
    title: 'The tow truck is nearby from you!',
    message: 'Tom Hardy',
    timeToArrive: 'will be in 20 minutes',
    price: 'Total for payment 250 ₪ '
}

export default class Details extends Component {
    state = {
        timeOver: false,
        visiable: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ timeOver: true });
        }, 28000);
    };
    change = () => {
        setTimeout(() => {
            this.setState({ timeOver: true });
        }, 28000);
    }
    handleBack = () => {
        this.setState({ visiable: false });
    }

    render() {
        if (!this.state.visiable) {
            return null;
        }
        return (
            <Container>
                <TypeTitle>{this.state.timeOver ? secondMessage.title : firstMessage.title}</TypeTitle>
                <TypeDescription>{this.state.timeOver ? secondMessage.message : firstMessage.message}</TypeDescription>
                <TypeImage source={this.state.timeOver ? images.homescreen.avatarTomer : images.homescreen.avatar} style={{ width: 140, height: 140 }} />
                <TypeDescription>{this.state.timeOver ? secondMessage.timeToArrive : null}</TypeDescription>
                <TypeDescription>{this.state.timeOver ? secondMessage.price : null}</TypeDescription>
                <RequestButton onPress={this.handleBack} style={this.state.timeOver ? { backgroundColor: '#dd4d5e' } : { backgroundColor: '#9c9c9c' }}>
                    <RequestButtonText >Accept</RequestButtonText>
                </RequestButton>
            </Container >
        );
    }
}
