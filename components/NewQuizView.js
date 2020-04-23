import React, {Component} from 'react';
import { Text, View,SafeAreaView,StyleSheet,TouchableOpacity,FlatList } from 'react-native';
import Constants from 'expo-constants';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

class NewQuizView extends Component {
  state = {
    deck: '',
    question: {

    }
  }
  handlePress = (e) => {
    // add deck to deck list
    const {question,deck} = this.state
    alert("Added Question to Specific Deck")
  }
  render() {
    const {question,deck} = this.state
    return (
      <View style={[styles.container,styles.justifyBetween]}>
          <Text style={[styles.title2,styles.textCenter]}>New Quiz</Text>
          <View style={[styles.flex1,styles.alignCenter]}>
              <View>
                  <Text style={[styles.title3,styles.textCenter]}>Question</Text>
                  <Text style={[styles.title3,styles.textCenter]}>Enter Your Question Here in Input Field</Text>
              </View>
              <View style={[styles.mt40]}>
                  <Text style={[styles.title3,styles.textCenter]}>Answer</Text>
                  <Text style={[styles.title3,styles.textCenter]}>Enter Your Answer Here in Input Field</Text>
              </View>
              <TouchableOpacity style={[styles.btn,styles.btnPrimary,styles.mt100]}  onPress={e => this.handlePress(e)}>
                  <Text style={[styles.textWhite]}>Create</Text>
              </TouchableOpacity>
          </View>
      </View>
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
})

export default NewQuizView
