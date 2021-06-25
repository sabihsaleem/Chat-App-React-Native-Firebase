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
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
 
export default function ChatMessage({route}) {
  const [messages, setMessages] = useState([]);
  const [key1, setKey1] = useState('')
  const [key2, setKey2] = useState('')
 
  useEffect(() => {
    console.log('this.props',route.params.item)
    let _key2 = route.params.item.key
    console.log('this.state',_key2)
    setKey2(_key2)
    setMessages([
      {
        _id: key2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: key1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
    fire()
    console.log('key1', key1)
    console.log('key2', key2)
  }, [])

  const fire = () => {
    AsyncStorage.getItem('@User').then(value => {
      let data = JSON.parse(value);
      let dataList = [];
      for (const element in data) {
        value = {...data[element], element};
        dataList.push(value);
      }
      console.log('dataList...', dataList);
      let mapData = dataList.map(
        (x) => x.key
      )
      console.log('mapData...', mapData[0]);
      setKey1(mapData[0])
    });
  }
 
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>{ 
      GiftedChat.append(previousMessages, messages),
      console.log('previousMessages',previousMessages)
    })
    console.log('messages',messages)

    database()
    .ref('User/'+key2+'/Messages')
    .set({
      name: messages[0].text,
    })
    .then(() => {
      console.log('Data set.')
    });
  }, [])
 
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: key2,
      }}
    />
  )
}