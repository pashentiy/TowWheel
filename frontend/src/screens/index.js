import React from 'react';

import { Container } from '../../components'
import { useDdux } from '../../hooks'
import Body from './body'
import Header from './header'

var socket = null

const Chat = ({ route, navigation }) => {
  const Ddux = useDdux()

  /*
   * TODO:// Socket Handler
   */
  
  return (
    <Container isTransparentStatusBar={false}>
      <Header _this={{ }} />
      <Body _this={{ }} />
    </Container>
  )
}

export default Chat

