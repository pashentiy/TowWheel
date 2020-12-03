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
    title: 'מסלולך התקבל בהצלחה!',
    message: 'מחפשים גרר פנוי עבורך...'
}
const secondMessage = {
    title: 'הגרר נמצא במרקח הנגיע ממך!',
    message: 'Tom Hardy',
    timeToArrive: 'אצלך תוך 20 דקות',
    price: 'סה"כ לתשלום 250 ₪ '
}

export default class Details extends Component {
    state = {
        timeOver: false,
        visiable: true
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ timeOver: true });
        }, 5000);
    };
    change = () => {
        setTimeout(() => {
            this.setState({ timeOver: true });
        }, 5000);
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
                    <RequestButtonText >מאשר</RequestButtonText>
                </RequestButton>
            </Container >
        );
    }
}
