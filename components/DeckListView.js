import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,YellowBox,RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {getDecks} from '../utils/helpers'
YellowBox.ignoreWarnings(['Remote debugger']);

function DeckItem (item){
  const deck = item.item
  console.log(deck)
  return (
      <View style={styles.deckItem}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
      </View>
  )
}

class DeckListView extends Component {
  state = {
    decks: [],
    isRefreshing: false
  }
  getDeck = () => {
    getDecks().then(res => {
      var temp = Object.values(res)
      if(temp){
        this.setState({
          decks : temp
        })
      }
    })
  }
  componentDidMount(){
    this.getDeck()
  }
  handlePress = (e,deck) => {
    var {navigation} = this.props
    navigation.navigate('DeckDetail',{
      deck: deck
    })
  }
  renderDeck = (item) => {
    console.log(item)
    const deck = item.item
    return (
      <TouchableOpacity onPress={e => this.handlePress(e,deck)}>
        <DeckItem item={deck}/>
      </TouchableOpacity>
    )
  }
  onRefresh = () => {
    this.getDeck()
  }
  render (){
    const {decks} = this.state
    if(decks){
      return (
        <FlatList data={decks} renderItem={this.renderDeck}
        refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              style={{ width: '100%', height: '0' }}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          >
        </FlatList>
      );
    }else{
      return (
        <Text>Loading</Text>
      )
    }
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


// <FlatList style={styles.container} data={decks} renderItem={this.renderDeck}>
// </FlatList>
