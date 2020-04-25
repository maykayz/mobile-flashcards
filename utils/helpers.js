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

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: 'Study Today',
    body: "Do not forget to study today",
    ios: {
      sound: true
    },
    android: {
      channelId: 'DailyReminder',
      sticky: false,
      color: 'red'
    }
  };
}

function createChannel() {
  return {
    name: 'Study Today',
    description: 'Do not forget to study today',
    sound: true,
    priority: 'high'
  };
}

export function  setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.createChannelAndroidAsync('DailyReminder', createChannel())
              .then(val => console.log('channel return:', val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);
                try {
                  Notifications.scheduleLocalNotificationAsync(
                    {
                      title: 'Study Today',
                      body: 'Do not forget to study today',
                    },
                    {
                      time: tomorrow,
                      repeat: 'day'
                    }
                  );
                } catch (e) {
                  alert(e);
                }
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}
