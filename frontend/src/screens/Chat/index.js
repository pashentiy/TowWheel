import React, { useState, useEffect, useRef, useReducer } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Linking
} from 'react-native';
import styles from './style'
import Config from '../../config'
import { useIsFocused } from '@react-navigation/native';
import { Container, Toast } from '../../components'
import { Mixins, Spacing, Typography } from '../../styles'
import API from '../../services/api'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

var socket = null

const Chat = ({ route, navigation }) => {
  const { name, partner_id, ride_id } = route.params
  const isFocused = useIsFocused()
  const Ddux = useDdux()
  const userDetails = Ddux.cache('user')

  const [chatData,setChatData] = useState([])

  useEffect(()=>{
    socketHandler()
    return () => {
      if (socket)
        socket.close();
    }
  },[])


  /*
   * Socket Handler
   */
  const socketHandler = async () => {
    socket = await API.SOCKET('/live-chat')
    socket.on('connect', () => {
      socket.emit('initialize_chat', { user_id: userDetails._id, partner_id: partner_id, ride_id: ride_id }, (response) => {
        setChatData(prev => response.reverse())
      })
    });

    socket.on('new_message', (data) => {
      setChatData(prev => {
        return [data,...prev]
      })
      socket.emit('message_seen',data._id)
    });

    socket.on('bulk_seen', (data) => {
      setChatData(prev => data.reverse())
    });


    socket.on('message_seen', (message_id) => {
      setChatData(prev => {
        const temp = prev.map(item=>{
          if(item._id == message_id){
            item.seen = true
          }
          return item
        })
        return temp
      })
    });

    socket.on('disconnect', () => {

    });
  }

  const sendMessage = async (message,setMessage)=>{
    if(message.length < 1)
    return Toast.show({ type: 'error', message: 'Message can not be empty.' }) 
    setMessage('')
    socket.emit('new_message', message, response=>{
      setChatData(prev => {
        return [response,...prev]
      })
    })
  }
  
  
  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ navigation, name }} />
      <Body _this={{ navigation, userDetails, chatData, sendMessage }} />
    </Container>
  )
}

export default Chat

