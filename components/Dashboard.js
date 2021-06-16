import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  FlatList,
  View,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: '',
      keyCurrentUser: '',
      data: [],
    };
  }

  componentDidMount() {
    const user = auth().currentUser;
    AsyncStorage.getItem('@User').then(value => {
      console.log(JSON.parse(value));
      let d = JSON.parse(value);
      let dataList = [];
      for (const key in d) {
        value = {...d[key], key};
        dataList.push(value);
      }
      console.log('key', dataList[0].key);
    });
    firebase
      .database()
      .ref('User')
      .on('value', snapshot => {
        const getValue = snapshot.val();
        console.log('getValue', getValue);
        let data = [];
        for (const key in getValue) {
          const value = {...getValue[key], key};
          data.push(value);
        }
        console.log('data', data);
        this.setState({
          data,
        });
      });
  }

  signOut() {
    auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Home');
        AsyncStorage.removeItem('@User');
      });
  }

  listData = (item) => {
    this.props.navigation.navigate('ChatMessage',{
      item
    });
  }

  render() {
    const {data} = this.state;
    return (
      <ImageBackground
        source={require('../assets/bg2.jpg')}
        style={styles.main}>
        <View style={styles.main}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                // this.props.navigation.goBack();
                this.props.navigation.navigate('Home');
              }}>
              <View style={{marginVertical: 5}}>
                <Icon name="arrow-back-ios" size={30} color="#48fbff" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                marginHorizontal: wp('28%'),
                fontSize: 28,
                fontWeight: 'bold',
                color: '#48fbff',
                alignSelf: 'center',
              }}>
              Dashboard
            </Text>
          </View>
          <View style={{marginVertical: wp('5%')}}>
            <FlatList
              style={styles.list}
              data={data}
              // ListEmptyComponent={() => this.emptyComponent()}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => this.listData(item)}
                >
                  <View style={styles.container1FlatlistView}>
                    <View style={{marginVertical: 5, width: wp('50%')}}>
                      <View style={styles.flatListContactNoView}>
                        <Text style={styles.flatListText}>
                          {item.name.toUpperCase()}
                        </Text>
                        <Text style={styles.flatListText}>
                          {item.contactNo}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>

          <View style={{marginTop: 'auto'}}>
            <TouchableOpacity
              style={styles.buttonSignOut}
              onPress={() => this.signOut()}>
              <Text style={styles.buttonTextSignOut}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
  },
  buttonSignOut: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#67bae3',
    width: wp('96%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextSignOut: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: '#48fbff',
    fontSize: 24,
    alignSelf: 'center',
  },
  list: {
    width: wp('100%'),
  },
  container1FlatlistView: {
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 2,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#67bae3',
  },
  flatListContactNoView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
  },
  flatListText: {
    paddingHorizontal: 20,
    color: '#48fbff',
    fontSize: 18,
  },
});
