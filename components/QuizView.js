import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import {setLocalNotification,clearLocalNotification} from '../utils/helpers'
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);


function FrontView ({item,numberOfCards,index,handleViewAnswer,handleCorrect,handleWrong}){
  const question = item
  return (
    <View style={[styles.container,styles.justifyBetween]}>
        <Text style={[styles.title3,styles.textLeft]}>{index+1}/{numberOfCards}</Text>
        <View style={[styles.flex1]}>
            <Text style={[styles.title2,styles.textCenter]}>{question}</Text>
        </View>
        <View style={[styles.flex1,styles.alignCenter]}>
            <TouchableOpacity style={[styles.btn,styles.btnPrimary]} onPress={e => handleCorrect(e)}>
                <Text style={[styles.textWhite]}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,styles.btnSecondary]}  onPress={e => handleWrong(e)}>
                <Text style={[styles.textWhite]}>Wrong</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={e => handleViewAnswer(e)}>
                <Text style={styles.mt40}>View Answer</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

function BackView ({item,numberOfCards,index,handleBack}){
  const answer = item
  return (
    <View style={[styles.container,styles.justifyBetween]}>
        <Text style={[styles.title3,styles.textLeft]}>{index}/{numberOfCards}</Text>
        <View style={[styles.flex1,styles.alignCenter]}>
            <Text style={[styles.title2,styles.textCenter]}>{answer}</Text>
        </View>
        <View style={[styles.flex1,styles.alignCenter]}>
            <TouchableOpacity onPress={e => handleBack(e)}>
                <Text style={styles.mt40}>Back To Question</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

function CompleteView ({totalMark,totalQuestion,backToDeck,restartQuiz}){





      clearLocalNotification().then(setLocalNotification)
  var completeText = '';
  if(totalMark == totalQuestion){
    completeText = "Awesome...!"
  }else if(totalMark == 0){
    completeText = "Try Again Later"
  }else{
    completeText = "Yay.. You did it..!"
  }
  return (
    <View style={[styles.container,styles.justifyBetween]}>
        <View style={[styles.flex1,styles.alignCenter]}>
            <Text style={[styles.title2,styles.textCenter]}>{completeText}</Text>
            <Text style={styles.mt40}>Your total mark is {totalMark}/{totalQuestion}</Text>
        </View>
        <View style={[styles.flex1,styles.alignCenter]}>
            <TouchableOpacity style={[styles.btn,styles.btnPrimary]} onPress={e => restartQuiz(e)}>
                <Text style={[styles.textWhite]}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,styles.btnSecondary]}  onPress={e => backToDeck(e)}>
                <Text style={[styles.textWhite]}>Back To Deck</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

class QuizView extends Component {
  state = {
    isQuestionView: true,
    currentCardIndex: 0,
    totalMark: 0,
    deck: {},
    isComplete: false
  }
  componentDidMount(){
    const {deck} = this.props.route.params
    this.setState({
      deck: deck
    })
  }
  restartQuiz = (e) => {
    this.setState({
      isComplete: false,
      currentCardIndex: 0,
      totalMark:0
    })
  }
  backToDeck = (e) => {
    var {navigation} = this.props
    navigation.navigate('DeckDetail',{
      deck: this.state.deck
    })
  }
  handleViewAnswer = (e) => {
      e.preventDefault()
      this.setState({
        isQuestionView: false
      })
  }
  handleCorrect = (e) => {
      e.preventDefault()
      const {deck,totalMark,currentCardIndex} = this.state
      this.setState({
        totalMark: totalMark+1
      })
      if(currentCardIndex < deck.questions.length){
        this.setState({
          currentCardIndex: currentCardIndex+1
        })
      }else if(currentCardIndex == deck.questions.length){
        var {navigation} = this.props
        navigation.navigate('Complete',{
          totalMark: this.state.totalMark,
          totalQuestion: deck.questions.length
        })
      }
  }
  handleWrong = (e) => {
    e.preventDefault()
    const {deck,currentCardIndex} = this.state
    if(currentCardIndex < deck.questions.length){
      this.setState({
        currentCardIndex: currentCardIndex+1
      })
    }else if(currentCardIndex == deck.questions.length){
      var {navigation} = this.props
      navigation.navigate('Complete',{
        totalMark: this.state.totalMark,
        totalQuestion: deck.questions.length
      })
    }
  }
  handleBack = (e) => {
      e.preventDefault()
      this.setState({
        isQuestionView: true
      })
  }
  render() {
    const {currentCardIndex,totalMark} = this.state
    const {deck} = this.props.route.params
    const totalQuestion = deck.questions.length
      if(deck){
        if(deck.questions && deck.questions.length > 0){
          if(currentCardIndex < totalQuestion){
            var question = deck.questions[currentCardIndex]
            var totalQuestions = totalQuestion
            if(this.state.isQuestionView){
              return (
                  <FrontView item={question.question} numberOfCards={totalQuestions} index={currentCardIndex}
                      handleViewAnswer={this.handleViewAnswer}
                      handleCorrect={this.handleCorrect}
                      handleWrong={this.handleWrong}
                  />
              );
            }else{
              return (
                  <BackView item={question.answer} numberOfCards={totalQuestions} index={currentCardIndex} handleBack={this.handleBack} />
              );
            }
          }else{
            return (
                <CompleteView totalMark={totalMark} totalQuestion={totalQuestion} restartQuiz={this.restartQuiz} backToDeck={this.backToDeck}/>
            )
          }
        }else{
          return (
            <Text style={styles.title3}>No Questions</Text>
          )
        }
      }else{
        return (
          <Text style={styles.title3}>Loading</Text>
        )
      }
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
  title2: {
    fontSize: 28
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
})

export default QuizView
