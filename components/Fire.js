// import firebase from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/auth';
import { Platform } from 'react-native';

let config = {
    apiKey: Platform.OS === 'android' ? 'AIzaSyBgVO5d2eanY_hSpGBo6uFZ_hCPmy1FqOY' : 'AIzaSyAEJVvMXafMciSPBqD-j1E4mgtGQe5H5Ms',
    authDomain: Platform.OS ==='android' ? '12063586025-ls0229j42oies46alenmjec5qd4n4lls.apps.googleusercontent.com' : '12063586025-aeueimj1lee0katgd87nikboc1id9h9g.apps.googleusercontent.com' ,
    databaseURL: 'https://another-chat-app-3fc78-default-rtdb.firebaseio.com/',
    projectId: 'another-chat-app-3fc78',
    storageBucket: 'another-chat-app-3fc78.appspot.com',
    messagingSenderId: '12063586025',
    appId: '1:12063586025:android:12fff05416c05f4eeda278',
    project_number: "12063586025",
  };
  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(config);
  }

class Fire {
  constructor() {
    this.observeAuth();
  }

  observeAuth = () =>{
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
