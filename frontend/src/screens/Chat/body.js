import React from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground
} from 'react-native';
import { useTheme } from '../../hooks'
import style from './style'
import { Mixins, Typography } from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { chat_background } from '../../assets'
import { ChatTimeFormat } from '../../utils'
import ChatInputBox from './chatInputBox'


const Body = ({ _this }) => {
    const [Colors, styles] = useTheme(style)

    const renderItem = ({ item, index }) => {
        if (_this.userDetails._id == item.sender)
            return <SendBubble _this={_this} item={item} index={index} />

        return <RecievedBubble _this={_this} item={item} index={index} />
    }

    const renderSeperator = () => {
        return (
            <View style={{ height: Mixins.scaleHeight(10) }} />
        )
    }

    return (
        <View style={styles.flex1}>
            <ImageBackground source={chat_background} style={styles.background} >
                <FlatList
                    contentContainerStyle={styles.paddingHorizontal10}
                    data={_this.chatData}
                    renderItem={renderItem}
                    ItemSeparatorComponent={renderSeperator}
                    keyExtractor={(item) => item._id}
                    keyboardShouldPersistTaps='handled'
                    onEndReached={() => null}
                    refreshing={false}
                    onRefresh={() => null}
                    inverted={true}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={styles.bottomChatContentOffset}></View>}
                    ListHeaderComponent={<View style={styles.bottomChatContentOffset}></View>}
                />
                <ChatInputBox sendMessage={_this.sendMessage} />
            </ImageBackground>
        </View>
    )
}

const SendBubble = ({ _this, item, index }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.sendContainer]}>
            <View style={[styles.sendBubble]}>
                <Text style={styles.sendText}>{item.message}</Text>
            </View>
            <View style={styles.chatTimeContainer}>
            <Text style={styles.chatTime}>{ChatTimeFormat(item.createdAt)}   </Text>
            <Icon name={item.seen?'check-double':'check'} style={styles.chatDeliveryIcon} />
            </View>
        </View>
    )
}

const RecievedBubble = ({ _this, item, index }) => {
    const [Colors, styles] = useTheme(style)
    return (
        <View style={[styles.receiveContainer]}>
            <View style={[styles.receiveBubble]}>
                <Text style={styles.receiveText}>{item.message}</Text>
            </View>
            <Text style={styles.chatTime}>{ChatTimeFormat(item.createdAt)}</Text>
        </View>
    )
}

export default Body
