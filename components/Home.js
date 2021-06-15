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

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  login() {

  }

  signup() {

  }
  
  render() {
    return (
      <View style={styles.container} >
        <View style={styles.loginView} >
          <TouchableOpacity style={styles.loginbtn} onPress={this.login} >
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupView} >
          <TouchableOpacity style={styles.signupbtn} onPress={this.signup} >
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  loginView:{

  },
  signupView: {

  },
  loginbtn: {
    borderWidth: 1,
    borderColor: 'cyan'
  },
  signupbtn: {

  }
})