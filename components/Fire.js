import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Platform } from 'react-native';

class Fire {
  constructor() {
    this.observeAuth();
  }

  observeAuth = () =>{
    auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  onAuthStateChanged = user => {
    if (!user) {
      try {
        auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (auth().currentUser || {}).uid;
  }

  get ref() {
    return database().ref('messages');
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
    return database.ServerValue.TIMESTAMP;
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
