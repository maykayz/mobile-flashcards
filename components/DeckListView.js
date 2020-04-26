import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,YellowBox,RefreshControl } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux'
import { handleInitialData } from '../actions/shared'
YellowBox.ignoreWarnings(['Remote debugger']);

function DeckItem (item,index){
  const deck = item.item
  const key = item.index
  return (
      <View style={styles.deckItem} key={key}>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
      </View>
  )
}

class DeckListView extends Component {
  state = {
    isRefreshing: false
  }
  componentDidMount(){
    this.props.handleInitialData();
  }
  handlePress = (e,deck) => {
    var {navigation} = this.props
    navigation.navigate('DeckDetail',{
      title: deck.title
    })
  }
  renderDeck = (item,index) => {
    const deck = item
    return (
      <TouchableOpacity onPress={e => this.handlePress(e,deck)} key={index}>
        <DeckItem item={deck} index={index}/>
      </TouchableOpacity>
    )
  }
  onRefresh = () => {
    this.getDeck()
  }
  render (){
    var temp = this.props.decks
    const decks = Object.values(temp)
    console.log(decks)
    if(decks.length > 0){
      return (
        <FlatList data={decks}
        renderItem={({item,index}) => this.renderDeck(item,index)}
        keyExtractor={(item,index) => index.toString()}
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
        <View style={styles.centerView}>
            <Text style={styles.title2}>No Decks...! Try adding new decks.</Text>
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  title2: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
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


function mapStateToProps ({decks},props) {
  return {
    decks
  }
}

export default connect(mapStateToProps,{handleInitialData})(DeckListView)
