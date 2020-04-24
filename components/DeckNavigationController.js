import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity ,YellowBox} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import DeckListView from './DeckListView'
import DeckDetailView from './DeckDetailView'
import NewQuizView from './NewQuizView'
import QuizView from './QuizView'

YellowBox.ignoreWarnings(['Remote debugger']);

const Stack = createStackNavigator();

class DeckNavigationController extends Component {
render() {
    return (
           <Stack.Navigator initialRouteName="DeckList">
             <Stack.Screen name="DeckList"    component={DeckListView} />
             <Stack.Screen name="DeckDetail"  component={DeckDetailView} />
             <Stack.Screen name="NewQuiz"     component={NewQuizView} />
             <Stack.Screen name="Quiz"        component={QuizView} />
           </Stack.Navigator>
    );
  }
}

export default DeckNavigationController
