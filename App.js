import React, {Component} from 'react';
import { Text, View,SafeAreaView,TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import DeckListView from './components/DeckListView'
import DeckDetailView from './components/DeckDetailView'
import QuizView from './components/QuizView'
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

class App extends Component {
  handlePress = (e) => {
    alert("Hello")
  }
  render() {
    return (
          // <DeckListView />
          // <DeckDetailView />
          <QuizView />
    );
  }
}

export default App
// - cd mobile-flashcards
// - npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
// - npm run android
// - npm run ios
// - npm run web
