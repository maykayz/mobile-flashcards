import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

function DeckItem (item){
  const deck = item.item
  return (
      <View style={styles.deckItem}>
          <Text>{deck.title}</Text>
          <Text>2 cards</Text>
      </View>
  )
}

class DeckListView extends Component {
  state = {
    decks: [
      {
        'React':
          {
            title: 'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              },
              {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
              }
            ]
          }
    },
      {
        'JavaScript':
        {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      },

    ]
  }
  handlePress = (e) => {
    alert("Hello")
  }
  renderDeck = (item) => {
    const deck = Object.values(item.item)[0]
    return (
      <DeckItem item={deck}/>
    )
  }
  render() {
    const decks = Object.values(this.state.decks)
    return (
          <FlatList style={styles.container} data={this.state.decks} renderItem={this.renderDeck}>
          </FlatList>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  deckItem: {
    height: 100,
    marginTop: 10,
    color: 'black',
    backgroundColor: '#ececec',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 30,
    marginRight:30
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: '#e76e63',
    margin: 10,
  },
  mt20: {
    marginTop:20,
  },
  btn: {
    width: 100,
    height: 30,
    textAlign: 'center',
    paddingTop: 5,
    marginTop:20,
  },
  btnPrimary: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  btnSuccess: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  btnDanger: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
})

export default DeckListView
