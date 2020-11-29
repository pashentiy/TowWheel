import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, AppState, ImageBackground } from 'react-native';
import colors from '../../utilities/colors';
import images from '../../utilities/images';



export const DestinationButton = function (props) {
    return (
        <TouchableOpacity onPress={() => { }} style={styles.container}>

            <View style={styles.leftContainer}>
                <Text style={styles.leftContainerContent}>{`\u25A0`}</Text>
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.centerContainerContent}>Where to ToWheel?</Text>
            </View>
            <View style={styles.rightContainer}>
                <ImageBackground
                    source={images.homescreen.towTruck}
                    style={styles.rightContainerContent}
                    resizeMode='cover'
                />
            </View>


        </TouchableOpacity>

    )
}
const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        height: 60,
        bottom: 50,
        left: 50,
        width: '80%',
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        alignItems: 'center',
    },
    centerContainer: {
        flex: 4
    },
    rightContainer: {
        flex: 1,
        borderLeftWidth: 1,
        borderColor: '#ededed',
    },
    leftContainerContent: {
        fontSize: 10,
        color: colors.$app_red
    },
    centerContainerContent: {
        fontSize: 21,
        color: '#9c9c9c'
    },
    rightContainerContent: {
        width: 40,
        height: 40,
        alignSelf: 'center'
    },

}

)