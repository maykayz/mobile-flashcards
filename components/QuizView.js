import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);


function FrontView ({item,numberOfCards,index,handleViewAnswer}){
  function handleCorrect(e){
      e.preventDefault()
      alert("U Hit Correct")
  }
  function handleWrong(e){
      e.preventDefault()
      alert("U Hit Wrong")
  }
  const question = item
  console.log(question)
  return (
    <View style={[styles.container,styles.justifyBetween]}>
        <Text style={[styles.title3,styles.textLeft]}>{index}/{numberOfCards}</Text>
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

class QuizView extends Component {
  state = {
    isQuestionView: true,
    question:
      {
          question: 'React uses the virtual DOM instead of the real DOMs.',
          answer: 'Correct'
      },
      numberOfCards : 6,
      index: 3
  }
  handleViewAnswer = (e) => {
      e.preventDefault()
      this.setState({
        isQuestionView: false
      })
  }
  handleBack = (e) => {
      e.preventDefault()
      this.setState({
        isQuestionView: true
      })
  }
  render() {
    const {numberOfCards,index,question} = this.state
    if(this.state.isQuestionView){
      return (
          <FrontView item={question.question} numberOfCards={numberOfCards} index={index} handleViewAnswer={this.handleViewAnswer} />
      );
    }else{
      return (
          <BackView item={question.answer} numberOfCards={numberOfCards} index={index} handleBack={this.handleBack} />
      );
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
    color: 'black',
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
