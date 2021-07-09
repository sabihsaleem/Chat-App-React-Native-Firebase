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
import LinearGradient from 'react-native-linear-gradient';
import { signIn } from "../redux/actions/AuthActions";
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: true,
      userList: [],
      state: this.props.state,
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
    const { dispatch, } = this.props;
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
            var payload = {
              Email: this.state.email,
              Password: this.state.password,
            };
            dispatch(signIn(payload));
        } 
        else {
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
            var payload = {
              Email: this.state.email,
              Password: this.state.password,
            };
            dispatch(signIn(payload));
        }
      }
      else {
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
      <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} style={styles.main}>
        <View>
          {this.state.isLoading ? (
            <KeyboardAvoidingView>
              <View style={styles.header}>
                <View style={styles.container}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Home');
                    }}>
                    <View style={{marginVertical: 5, marginHorizontal: 10}}>
                      <Icon name="arrow-back-ios" size={30} color="white" />
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginHorizontal: wp('30%'),
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: 'white',
                      alignSelf: 'center',
                    }}>
                    Login
                  </Text>
                </View>
              </View>
              <ScrollView>
                <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} style={styles.innerContainer} >
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
              </LinearGradient>
              </ScrollView>
              <View style={styles.footer} />
            </KeyboardAvoidingView>
          ) : (
            <View>
              <Text> Failed </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  state: state
});

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    // borderWidth:1
    flexDirection: 'row',
  },
  innerContainer:{
    borderTopLeftRadius: 180,
    borderColor: 'cadetblue',
    borderWidth: 5,
    // paddingTop: wp('30%'),
    height: hp('80.5%'), 
    borderBottomRightRadius: 180,
    opacity: 0.8,
  },
  image: {
    marginVertical: 5,
    width: wp('10%'),
    height: hp('6.5%'),
    marginHorizontal: 5,
  },
  header: {
    height: hp('8%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderBottomRightRadius: 180,
    borderWidth: 5,
    opacity: 1
  },
  footer: {
    height: hp('8%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderWidth: 5,
    borderTopLeftRadius: 180,
    opacity: 1
  },
  //container1
  container1: {
    height: hp('15%'),
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer1: {
    marginHorizontal: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  //container2
  container2: {
    height: hp('35%'),
    // backgroundColor:'blue',
  },
  textContainer2: {
    marginHorizontal: 10,
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textInputContainer2: {
    // marginHorizontal: 10,
    width: wp('96%'),
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 10,
    color: 'white',
  },
  //conatainer3
  container3: {
    height: hp('30%'),
    // backgroundColor:'green',
    alignItems: 'center',
    marginVertical: wp('6%')
  },
  button: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
    width: wp('96%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginVertical: 11,
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    alignSelf: 'center',
  },
});
