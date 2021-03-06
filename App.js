import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity ,YellowBox} from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DeckNavigationController from './components/DeckNavigationController'
import NewDeckView from './components/NewDeckView'
import {setLocalNotification} from './utils/helpers'

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';

YellowBox.ignoreWarnings(['Remote debugger']);

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

const Tab = createBottomTabNavigator();

class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer onNavigationStateChange={this.handleNavigationStateChange}>
            <Tab.Navigator>
              <Tab.Screen name="Home"
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
           component={DeckNavigationController} />
              <Tab.Screen name="New Deck"
              options={{
                tabBarLabel: 'New Deck',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="cards" color={color} size={size} />
                ),
              }}
              component={NewDeckView} />
            </Tab.Navigator>
        </NavigationContainer>
    </Provider>
    );
  }
}

export default App
