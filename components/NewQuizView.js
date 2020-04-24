import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList,KeyboardAvoidingView ,TextInput,Platform} from 'react-native';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
import {saveDeckTitle} from '../utils/helpers'

YellowBox.ignoreWarnings(['Remote debugger']);


class NewQuizView extends Component {
  state = {
    deck: '',
    question: {

    },
    questionText: '',
    answerText: '',
    title: ''
  }
  handlePress = (e) => {
    var {questionText,answerText} = this.state
    var {navigation} = this.props
    var {deck} = this.props.route.params
    var question = {
      question: questionText,
      answer: answerText
    }
    saveDeckTitle(deck.title,question).then(res => {
      navigation.navigate('DeckList')
    })
  }
  onChangeTextQuestion = (text) => {
    this.setState({
      questionText : text
    })
  }
  onChangeTextAnswer = (text) => {
    this.setState({
        answerText : text
    })
  }
  componentDidMount(){
    var {deck} = this.props.route.params
    console.log("NEQ QUIZ VIEW")
    console.log(deck)
    if(deck){
      this.setState({
        title: deck.title
      })
    }
  }
  render() {
    const {question,deck,questionText,answerText} = this.state

    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[styles.container,styles.justifyBetween]}>
          <Text style={[styles.title2,styles.textCenter]}>New Quiz</Text>
          <View style={[styles.flex1,styles.alignCenter]}>
              <View>
                  <Text style={[styles.title2Sub,styles.textCenter]}>Enter Question</Text>
                  <TextInput style={[styles.inputText,styles.textCenter,styles.mt20,styles.title3]} clearTextOnFocus={true} caretHidden={false} value={questionText} onChangeText={text => this.onChangeTextQuestion(text)}></TextInput>
              </View>
              <View style={[styles.mt40]}>
                  <Text style={[styles.title2Sub,styles.textCenter]}>Enter Answer</Text>
                  <TextInput style={[styles.inputText,styles.textCenter,styles.mt20,styles.title3]} clearTextOnFocus={true} caretHidden={false} value={answerText} onChangeText={text => this.onChangeTextAnswer(text)}></TextInput>
              </View>
              <TouchableOpacity style={[styles.btn,styles.btnPrimary,styles.mt100]}  onPress={e => this.handlePress(e)}>
                  <Text style={[styles.textWhite]}>Create</Text>
              </TouchableOpacity>
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

export default NewQuizView
