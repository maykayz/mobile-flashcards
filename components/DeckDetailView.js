import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

class DeckDetailView extends Component {
  state = {
    deck:{
      }
  }
  componentDidMount(){
    const {deck} = this.props.route.params
    console.log(deck)
    this.setState({
      deck: deck
    })
  }
  startQuiz = (e) => {
    var {navigation} = this.props
    navigation.navigate('Quiz',{
      deck: this.state.deck
    })
  }
  addQuiz = (e) => {
    var {navigation} = this.props
    navigation.navigate('NewQuiz',{
      deck: this.state.deck
    })
  }
  render() {
    const {deck} = this.state
    if(deck){
      return (
        <View style={[styles.container,styles.alignCenter,styles.justifyBetween]}>
            <View style={styles.flex1}>
                <Text style={[styles.title1,styles.textCenter]}>{deck.title}</Text>
                <Text style={[styles.title2,styles.textCenter]}>{deck.questions ? deck.questions.length : 0} Cards</Text>
            </View>
            <View style={[styles.flex1]}>
                <TouchableOpacity style={[styles.btn,styles.btnPrimary]} onPress={e => this.startQuiz(e)}>
                    <Text style={[styles.textWhite]}>Start Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn,styles.btnSecondary]}  onPress={e => this.addQuiz(e)}>
                    <Text style={[styles.textWhite]}>Add Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
    }else{
      return(
        <Text style={[styles.title3,styles.textCenter]}>Loading</Text>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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

export default DeckDetailView
