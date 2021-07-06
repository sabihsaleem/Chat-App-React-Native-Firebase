import 'react-native-gesture-handler';
import React from 'react';
import Main from './components/Main';
import Chat from './components/Chat';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ChatMessage from './components/ChatMessage';
import { Provider } from 'react-redux';
import store from "./redux/store";

const Stack = createStackNavigator();

// Create the navigator
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName="Home"
        >
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="ChatMessage" component={ChatMessage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
