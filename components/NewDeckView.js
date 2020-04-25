import React, {Component} from 'react';
import { Text, View,StyleSheet,TouchableOpacity,FlatList ,TextInput, KeyboardAvoidingView,Platform,YellowBox} from 'react-native';
import Constants from 'expo-constants';
import {saveDeck,getDeck} from '../utils/helpers'

YellowBox.ignoreWarnings(['Remote debugger']);

class NewDeckView extends Component {
  state = {
    title: 'Enter Deck Name: '
  }
  handlePress = (e) => {
    e.preventDefault()
    const {title} = this.state
    var {navigation} = this.props
    saveDeck(title).then(res => {
      getDeck(title).then(deck => {
        console.log(deck)
        navigation.navigate('DeckDetail',{
            deck: deck
        })
      })
    })
  }
  onChangeText = (text) => {
    const input = text
    this.setState({
      title : input
    })
  }
  render() {
    const {title} = this.state
    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[styles.container,styles.justifyBetween]}>
          <View style={[styles.flex1,styles.alignCenter]}>
              <Text style={[styles.title2Sub,styles.textCenter]}>Enter Your Deck Name</Text>
              <TextInput style={[styles.inputText,styles.textCenter,styles.mt40,styles.title3]} clearTextOnFocus={true} caretHidden={false} value={title} onChangeText={text => this.onChangeText(text)}></TextInput>
              <TouchableOpacity style={[styles.btn,styles.btnPrimary,styles.mt100]}  onPress={e => this.handlePress(e)}>
                  <Text style={[styles.textWhite]}>Create</Text>
              </TouchableOpacity>
              <Text style={[styles.textCenter,styles.mt40]}>Drag DeckList UI to refresh</Text>
          </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    padding:20
  },
  flex1: {
    flex:1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
  textCenter: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center'
  },
  title1: {
    fontSize: 40
  },
  title1Sub: {
    fontSize: 32
  },
  title2: {
    fontSize: 28
  },
  title2Sub: {
    fontSize: 24
  },
  title3: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
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
  mt30: {
    marginTop:30,
  },
  mt40: {
    marginTop:40,
  },
  mt100: {
    marginTop:100,
  },
  btn: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
  },
  btnPrimary: {
    backgroundColor: '#ffc107',
  },
  textWhite: {
    color: '#fff'
  },
  btnSecondary: {
    backgroundColor: '#007bff',
  },
  btnSuccess: {
    backgroundColor: '#28a745',
  },
  btnDanger: {
    backgroundColor: '#dc3545',
  },
  inputText: {
    alignSelf: 'stretch',
    borderBottomWidth : 1.0,
    borderBottomColor: '#000',
    padding: 10,
  }
})

export default NewDeckView
