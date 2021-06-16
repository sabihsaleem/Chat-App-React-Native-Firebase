import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
      userList: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref('User')
      .on('value', snapshot => {
        console.log('snapshot.val()', snapshot.val());
        const getValue = snapshot.val();
        console.log('getValue', getValue);
        let userArray = [];
        for (let key in getValue) {
          const value = {...getValue[key], key};
          userArray.push(value);
        }
        console.log(userArray, 'accc');
        this.setState({
          userList: userArray,
        });
      });
  }

  onLogin() {
    if (this.state.email && this.state.password) {
      let xuserList = this.state.userList.filter(
        el => el.email.toLowerCase() === this.state.email.toLowerCase(),
      );
      console.log('xuserList', xuserList);
      if (xuserList[0]) {
        if (xuserList[0].isAdmin === true) {
          console.log('xuserList');
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async err => {
              console.log(err.user.email, 'Welcome!');

              let Data = this.state.userList.filter(
                el => el.email === err.user.email,
              );
              console.log('data:', Data);
              try {
                var currentUser = {...Data};
                await AsyncStorage.setItem(
                  '@User',
                  JSON.stringify(currentUser),
                );
              } catch (err) {
                console.log('err', err);
              }
              this.props.navigation.navigate('Admin');
            })
            .catch(error => {
              console.log('error', error);
              Alert.alert('Error!', 'Incorrect Data');
            });
        } else {
          console.log('xxuserList');
          firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async err => {
              console.log(err.user.email, 'Welcome!');
              let Data = this.state.userList.filter(
                el =>
                  el.email.toLowerCase() === err.user.email.toLocaleLowerCase(),
              );
              console.log('data:', Data);
              try {
                var currentUser = {...Data};
                await AsyncStorage.setItem(
                  '@User',
                  JSON.stringify(currentUser),
                );
              } catch (err) {
                console.log('err', err);
              }
              this.props.navigation.navigate('Dashboard');
            })
            .catch(error => {
              console.log('error', error);
              Alert.alert('Error!', 'Incorrect Data');
            });
        }
      } else {
        Alert.alert('Error!', 'Incorrect Data Enter');
      }
    } else {
      alert('Enter Data Please');
    }

    console.log('LOGIN');
  }

  onRegister() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    const {userList, email, password} = this.state;
    return (
      <ImageBackground
        source={require('../assets/bg2.jpg')}
        style={styles.main}>
        <View>
          {this.state.isLoading ? (
            <KeyboardAvoidingView>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Home');
                  }}>
                  {/* <Image
                        style={styles.image}
                        source={require('../assets/Back3.png')}
                    /> */}
                  <View style={{marginVertical: 5, marginHorizontal: 10}}>
                    <Icon name="arrow-back-ios" size={30} color="#48fbff" />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: wp('30%'),
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#48fbff',
                    alignSelf: 'center',
                  }}>
                  Login
                </Text>
              </View>
              <ScrollView>
                <View style={styles.container1}>
                  <Text style={styles.textContainer1}>
                    Welcome To Another Chat
                  </Text>
                </View>
                <View style={styles.container2}>
                  <Text style={styles.textContainer2}>Email:</Text>
                  <TextInput
                    style={styles.textInputContainer2}
                    placeholder="Enter Here"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={email => this.setState({email: email})}
                  />
                  <Text style={styles.textContainer2}>Password:</Text>
                  <TextInput
                    style={styles.textInputContainer2}
                    placeholder="Enter Here"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={password =>
                      this.setState({password: password})
                    }
                    secureTextEntry={true}
                  />
                </View>
                <View style={styles.container3}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onLogin()}>
                    <Text style={styles.buttonText}>Sign in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onRegister()}>
                    <Text style={styles.buttonText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          ) : (
            <View>
              <Text> Failed </Text>
            </View>
          )}
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
  container: {
    // borderWidth:1
    flexDirection: 'row',
  },
  image: {
    marginVertical: 5,
    width: wp('10%'),
    height: hp('6.5%'),
    marginHorizontal: 5,
  },
  //container1
  container1: {
    height: hp('20%'),
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer1: {
    marginHorizontal: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#48fbff',
  },
  //container2
  container2: {
    height: hp('40%'),
    // backgroundColor:'blue',
  },
  textContainer2: {
    marginHorizontal: 10,
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#48fbff',
  },
  textInputContainer2: {
    marginHorizontal: 10,
    width: wp('96%'),
    borderWidth: 2,
    borderColor: '#67bae3',
    paddingHorizontal: 10,
    color: 'white',
  },
  //conatainer3
  container3: {
    height: hp('30%'),
    // backgroundColor:'green',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#67bae3',
    width: wp('96%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: '#48fbff',
    fontSize: 24,
    alignSelf: 'center',
  },
});
