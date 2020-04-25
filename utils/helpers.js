import {AsyncStorage} from 'react-native'
import {QUIZ_STORAGE_KEY,DECK_STORAGE_KEY,NOTIFICATION_KEY} from '../actions/types'
import { decks } from './_DATA';
import {Notifications} from 'expo'
import * as Permissions from 'expo-permissions';

export async function getDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    if (storeResults === null) {
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks));
    }
    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeck(id) {
  try {
    const storeResults = await AsyncStorage.getItem(DECK_STORAGE_KEY);
    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeck(title) {
  try {
    await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function saveDeckTitle(title, card) {
    console.log(title)
    // var newCard = JSON.stringify(card)
    // console.log(newCard)
  try {
    const deck = await getDeck(title);
    await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );

    const newDeck = await getDeck(title);
    console.log(newDeck)

  } catch (err) {
    console.log(err);
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync(res => {
      console.log(res)
      console.log("Clear noti")
    }))
}

function createNotification () {
  return {
    title: 'Log your stats!',
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export async function setLocalNotification () {
  console.log("setLocalNotification")
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
         Permissions.getAsync(Permissions.NOTIFICATIONS).then(res => {
           if (res.status === 'granted') {
             console.log(res)
             Notifications.cancelAllScheduledNotificationsAsync().then(cancelRes => {
                 let tomorrow = new Date()
                 tomorrow.setDate(tomorrow.getDate()+1)
                 tomorrow.setHours(20)
                 tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync({
                  title: 'hello',
                  body: 'hey'
                }, {
                  time: tomorrow,
                  repeat: 'day'
                })

                 AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
             })
           }else{
             console.log('error in permission get async')
           }
         })

      }
    }).catch(err => {
      console.log(err)
    })
}
