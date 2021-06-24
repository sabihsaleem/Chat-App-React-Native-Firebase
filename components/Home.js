import React, {Component} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('@User').then(value => {
      console.log(JSON.parse(value));
      let d = JSON.parse(value);
      let data = [];
      for (const element in d) {
        value = {...d[element], element};
        data.push(value);
      }
      console.log('data', data);
      if (value !== null) {
        console.log('null');
        this.props.navigation.navigate('Dashboard');
      }
    });
  }

  login = () => {
    this.props.navigation.navigate('Login');
  };

  signup() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']}  style={{flex: 1}}>
        <View style={styles.header} />
        <LinearGradient colors={['cadetblue', '#5a9eb0', 'cadetblue']} style={styles.container}>
          <View style={styles.loginView}>
            <TouchableOpacity
              style={styles.loginbtn}
              onPress={() => this.login()}>
              <Text style={styles.loginbtnText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupView}>
            <TouchableOpacity
              style={styles.signupbtn}
              onPress={() => this.signup()}>
              <Text style={styles.signupbtnText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.footer} />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    alignItems: 'center',
    // justifyContent: 'center',
    width: wp('100%'),
    // backgroundColor: 'cadetblue',
    borderTopLeftRadius: 180,
    borderColor: 'lightblue',
    borderWidth: 1,
    paddingTop: wp('30%'),
    borderBottomRightRadius: 180,
    opacity: 0.8
  },
  header: {
    flex: 0.2, 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderBottomRightRadius: 180,
    borderWidth: 1,
    opacity: 1
  },
  footer: {
    flex: 0.2, 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderWidth: 1,
    borderTopLeftRadius: 180,
    opacity: 1
  },
  loginView: {
    marginBottom: wp('20%'),
  },
  signupView: {},
  loginbtn: {
    borderWidth: 2,
    borderColor: 'lightskyblue',
    borderRadius: 20,
    width: wp('20'),
    height: hp('7'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupbtn: {
    borderWidth: 2,
    borderColor: 'lightskyblue',
    borderRadius: 20,
    width: wp('20'),
    height: hp('7'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginbtnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  signupbtnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
