import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default class Registeration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      address: '',
      contactNo: '',
      isLoading: true,
    };
  }

  onRegisteration(name, password, email, address, contactNo) {
    if (
      this.state.email &&
      this.state.password &&
      this.state.address &&
      this.state.name &&
      this.state.contactNo
    ) {
      auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          firebase
            .database()
            .ref('User')
            .push({
              name,
              password,
              email,
              address,
              contactNo,
              isAdmin: false,
            })
            .then(() => {
              console.log('Data update.');
              alert('Data update.');
            })
            .catch(error => {
              console.log('failed: ' + error.message);
            });
          this.props.navigation.navigate('Login');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('Error!', 'That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('Error!', 'That email address is invalid!');
          }

          console.error(error);
        });
    } else {
      alert('Enter Data Please');
    }
  }
  render() {
    const {name, email, password, address, contactNo} = this.state;
    return (
      <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} 
        style={styles.main}>
        {this.state.isLoading ? (
          <KeyboardAvoidingView>
            <View style={styles.header}>
              <View style={styles.container}>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.goBack();
                    this.props.navigation.navigate('Home');
                  }}>
                  <View style={{marginVertical: 5, marginHorizontal: 10}}>
                    <Icon name="arrow-back-ios" size={30} color="white" />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    marginHorizontal: wp('20%'),
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'white',
                    alignSelf: 'center',
                  }}>
                  Registeration
                </Text>
              </View>
            </View>
            <ScrollView>
            <LinearGradient colors={['cadetblue', 'lightblue', 'cadetblue']} style={styles.innerContainer} >
              <View style={styles.container2}>
                <Text style={styles.textContainer2}>Name:</Text>
                <TextInput
                  style={styles.textInputContainer2}
                  placeholder="Enter Here"
                  placeholderTextColor="white"
                  value={name}
                  onChangeText={name => this.setState({name: name})}
                />
                <Text style={styles.textContainer2}>Password:</Text>
                <TextInput
                  style={styles.textInputContainer2}
                  placeholder="Enter Here"
                  placeholderTextColor="white"
                  value={password}
                  onChangeText={password => this.setState({password: password})}
                />
                <Text style={styles.textContainer2}>Email:</Text>
                <TextInput
                  style={styles.textInputContainer2}
                  placeholder="Enter Here"
                  placeholderTextColor="white"
                  value={email}
                  onChangeText={email => this.setState({email: email})}
                />
                <Text style={styles.textContainer2}>Address:</Text>
                <TextInput
                  style={styles.textInputContainer2}
                  placeholder="Enter Here"
                  placeholderTextColor="white"
                  value={address}
                  onChangeText={address => this.setState({address: address})}
                />
                <Text style={styles.textContainer2}>Contact No:</Text>
                <TextInput
                  style={styles.textInputContainer2}
                  placeholder="Enter Here"
                  placeholderTextColor="white"
                  maxLength={14}
                  value={contactNo}
                  onChangeText={contactNo =>
                    this.setState({contactNo: contactNo})
                  }
                />
              </View>
              <View style={styles.container3}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.onRegisteration(
                      name,
                      password,
                      email,
                      address,
                      contactNo,
                    )
                  }>
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
              </LinearGradient>
              <View style={styles.footer} />
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <View>
            <Text> Failed </Text>
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    resizeMode: 'cover',
  },
  //container
  container: {
    // borderWidth:1
    flexDirection: 'row',
  },
  innerContainer:{
    borderTopLeftRadius: 180,
    borderColor: 'cadetblue',
    borderWidth: 5,
    // paddingTop: wp('30%'),
    height: hp('84%'), 
    borderBottomRightRadius: 180,
    opacity: 0.8,
  },
  header: {
    height: hp('7%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderBottomRightRadius: 180,
    borderWidth: 5,
    opacity: 1
  },
  footer: {
    height: hp('12%'), 
    backgroundColor: 'cadetblue',
    borderColor: 'cadetblue',
    borderWidth: 5,
    borderTopLeftRadius: 180,
    opacity: 1
  },
  image: {
    marginVertical: 5,
    width: wp('10%'),
    height: hp('6.5%'),
    marginHorizontal: 5,
  },
  //container1
  container1: {
    // height: hp('5%'),
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
    // height: hp('72%'),
    // marginTop: hp('5%')
    // backgroundColor:'blue',
  },
  textContainer2: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  textInputContainer2: {
    marginHorizontal: 3,
    width: wp('96%'),
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 10,
    color: 'white',
  },
  //conatainer3
  container3: {
    // height: hp('15%'),
    // backgroundColor:'green',
    alignItems: 'center',
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
