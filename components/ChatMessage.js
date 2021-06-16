// import React, { Component } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// export default class ChatMessage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     }
//   }

//   componentDidMount() {
//     console.log('this.props',this.props.route.params.item)
//   }

//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
//         <Text>ChatMessage</Text>
//       </View>
//     )
//   }
// }
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
 
export default function ChatMessage({route}) {
  const [messages, setMessages] = useState([]);
 
  useEffect(() => {
    // console.log('this.props',route.params.item)
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}