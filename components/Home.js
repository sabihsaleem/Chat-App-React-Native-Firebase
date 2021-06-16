import React, { Component } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AsyncStorage.getItem('@User').then((
      value => {
      console.log(JSON.parse(value))
      let d = JSON.parse(value)
      let data = [] 
      for (const element in d) {
          value={...d[element],element}
          data.push(
              value
          )
      }
      console.log("data",data)
      if (value !== null) {
        console.log("null")
        this.props.navigation.navigate('Dashboard')
      } 
    }))
  }

  login = () => {
    this.props.navigation.navigate('Login');
  }

  signup() {
    this.props.navigation.navigate('Signup');
  }
  
  render() {
    return (
      <ImageBackground source={require('../assets/bg2.jpg')} style={styles.container} >
        <View style={styles.loginView} >
          <TouchableOpacity style={styles.loginbtn} onPress={ ()=> this.login() } >
            <Text style={styles.loginbtnText} >Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupView} >
          <TouchableOpacity style={styles.signupbtn} onPress={ ()=> this.signup() } >
            <Text style={styles.signupbtnText} >Signup</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    width: wp('100%'),
  },
  loginView:{
    marginBottom: wp('20%')
  },
  signupView: {

  },
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
    color: '#48fbff',
    fontWeight: 'bold',
  },
  signupbtnText: {
    fontSize: 18,
    color: '#48fbff',
    fontWeight: 'bold',
  }
})