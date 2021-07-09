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
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Searchbar } from 'react-native-paper';
import { setAuthData } from '../redux/reducers/AuthReducer';
import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      name: '',
      keyCurrentUser: '',
      data: [],
      searchQuery: '',
      filteredData: [],
      isFiltered: false,
      authData: props.authData
    };
    console.log('authData', this.state.authData)
  }

  componentDidMount() {
    const { dispatch, } = this.props;
    const { authData, } = this.state;
    // const { Email = null, Password = null } = authData;
    const user = auth().currentUser;
    AsyncStorage.getItem('@User').then(value => {
      let d = JSON.parse(value);
      let dataList = [];
      for (const key in d) {
        value = {...d[key], key};
        dataList.push(value);
      }
    });
    firebase
      .database()
      .ref('User')
      .on('value', snapshot => {
        const getValue = snapshot.val();
        let data = [];
        for (const key in getValue) {
          const value = {...getValue[key], key};
          data.push(value);
        }
        this.setState({
          data,
        });
      });
    var payload = {
      Email: authData?.Email,
      Password: authData?.Password
    }
    dispatch(setAuthData(payload))
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

  onChangeSearch = (searchQuery) => {
    const {data=[]} = this.state;
    var _data=Array.from(data)
    console.log('searchQuery',searchQuery)
    // let filteredData = _data.filter(
    //   (el) => el.name.toLowerCase() == searchQuery.toLowerCase(),
    // );
    // console.log('filteredData: ', filteredData);

    const filteredData = this.state.data.filter((item) => {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = searchQuery.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log('filteredData:', filteredData);

    this.setState({
      searchQuery,
      filteredData,
      isFiltered: true,
      isSearchSelected: false,
    })
  }

  render() {
    const {data,searchQuery, filteredData, isFiltered, isSearchSelected} = this.state;
    return (
      <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} 
        style={styles.main}>
        <View style={styles.main}>
        <ScrollView>
          
          <View style={styles.header}>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  marginHorizontal: wp('2%'),
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: 'white',
                  alignSelf: 'center',
                  marginEnd: wp('35%')
                }}>
                Dashboard
              </Text>
              <TouchableOpacity onPress={() => this.setState({isSearchSelected: !this.state.isSearchSelected})} >
                <Icon name="magnifier" type={"SimpleLineIcons"} size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity  >
                <Icon name="options-vertical" type={"SimpleLineIcons"} size={30} color="white" />
              </TouchableOpacity>
            </View>

          </View>
          <View style={{marginVertical: wp('0%')}}>
            <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} style={styles.innerContainer} >
            {
              isSearchSelected &&
                <Searchbar
                  placeholder="Search"
                  onChangeText={this.onChangeSearch}
                  value={searchQuery}
                  style={{
                    backgroundColor: 'lightblue',
                    borderColor: 'white',
                    borderWidth: 2,
                    marginTop: wp('1%'),
                    marginBottom: wp('1%')
                  }}
                />
            }
              <FlatList
                style={styles.list}
                data={ isFiltered === true ? filteredData : data }
                extraData={data}
                // ListEmptyComponent={() => this.emptyComponent()}
                renderItem={({item, index}) => {
                  return(
                    <TouchableOpacity onPress={() => this.listData(item)}>
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
                  )
                }}
                keyExtractor={(item, index) => `${index}`}
              />
            </LinearGradient>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.buttonSignOut}
              onPress={() => this.signOut()}>
              <Text style={styles.buttonTextSignOut}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  authData: state.Auth.authData
});

export default connect(mapStateToProps)(Dashboard);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    width: wp('100%'),
  },
  innerContainer:{
    borderTopLeftRadius: 180,
    borderColor: 'cadetblue',
    borderWidth: 5,
    // paddingTop: wp('30%'),
    height: hp('75%'), 
    borderBottomRightRadius: 180,
    opacity: 0.8,
  },
  header: {
    height: hp('7%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderBottomRightRadius: 180,
    borderWidth: 5,
    opacity: 1,
    width: wp('100%'),
  },
  footer: {
    height: hp('14.5%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderWidth: 5,
    borderTopLeftRadius: 180,
    opacity: 1,
    marginTop: 'auto'
  },
  buttonSignOut: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    width: wp('96%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextSignOut: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
  list: {
    width: wp('96%'),
    marginHorizontal: wp('1%')
  },
  container1FlatlistView: {
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 2,
    width: wp('96%'),
    alignSelf: 'center',
    borderColor: 'white',
  },
  flatListContactNoView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 5,
  },
  flatListText: {
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 18,
    width: wp('50%'),
  },
});
