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
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function ChatMessage({route}) {
  const [messages, setMessages] = useState([]);
  const [key1, setKey1] = useState('')
  const [key2, setKey2] = useState('')
  const [name, setName] = useState('')
  const [nameUser, setNameUser] = useState('')
  const [contactNoUser, setContactNoUser] = useState('')
 
  useEffect(() => {
    console.log('this.props',route.params.item)
    let _nameUser = route.params.item.name
    setNameUser(_nameUser)
    let _contactNoUser = route.params.item.contactNo
    setContactNoUser(_contactNoUser)
    let key2 = route.params.item.key
    console.log('this.state',key2)
    setKey2(key2)
    setMessages([
      {
        _id: key2,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: key1,
          name: name,
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
    fire()
    console.log('key1', key1)
    console.log('key2', key2)
    console.log('messages', messages)
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
      let mapDataName = dataList.map(
        (x) => x.name
      )
      console.log('mapDataName...', );
      let _name = mapDataName[0]
      console.log('this.state',_name)
      setName(_name)
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
    .push({
      name: messages[0].text,
    })
    .then(() => {
      console.log('Data set.')
    });
  }, [])
 
  return (
    <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} style={styles.main}>
      <View style={styles.header}>
  
        <View style={styles.rowMain}>

          <View style={{justifyContent: 'center', marginBottom: wp('4%'), marginHorizontal: wp('2%')}} >
            <TouchableOpacity>
              {/* <Image style={styles.moreOptions} source={require('../assets/moreOptions.png')} /> */}
              <Icon name="arrow-left" size={30} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.column} >

            <View style={styles.row}>

              <View style={styles.textHeader}>
                <Text style={styles.text}>
                  {nameUser.toLocaleUpperCase()}
                </Text>
              </View>

            </View>

            <View style={styles.textHeader1}>
              <Text style={styles.text1}>
                {contactNoUser}
              </Text>
            </View>

          </View>

          <View style={styles.moreOptionsView} >
            <TouchableOpacity>
              {/* <Image style={styles.moreOptions} source={require('../assets/moreOptions.png')} /> */}
              <Icon name="options-vertical" type={"SimpleLineIcons"} size={30} color="white" />
            </TouchableOpacity>
          </View>

        </View>        

      </View>
      <View style={styles.chat} >
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: key2,
          }}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  chat: {
    flex: 0.9,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rowMain: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textHeader: {
    marginHorizontal: wp('5%')
  },
  text: {
    color: 'white',
    fontSize: wp('5%')
  },
  textHeader1: {
    marginHorizontal: wp('5%'),
    marginBottom: wp('5%')
  },
  text1: {
    color: 'white',
    fontSize: wp('3%')
  },
  row: {
    flexDirection: 'row',
    marginVertical: wp('1.5%')
  },
  header: {
    flex: 0.1,
    backgroundColor: 'cadetblue',
    borderColor: 'lightblue',
    borderWidth: 1,
    opacity: 1,
    borderRadius: wp('2%')
  },
  moreOptions: {
    width: wp('2%'),
    height: hp('4%'),
  },
  moreOptionsView: {
    marginVertical: wp('4%'),
    marginEnd: wp('5%'),
  }
})