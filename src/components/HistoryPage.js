import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { getHistory } from '../database';
import firebase from '../db_config.js';
import 'firebase/firestore';

const trashIcon = require('../../assets/trash.png');


export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  const deleteHistoryById = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection('munkaido-d8177').doc(id).delete();
      console.log(`A bejegyzés sikeresen törölve az ID alapján: ${id}`);
    } catch (error) {
      console.error('Hiba a bejegyzés törlésekor:', error);
    }
  };  

  const showDeleteConfirmation = (item) => {
    Alert.alert(
      'Törlés megerősítése',
      'Biztosan törölni szeretné ezt a bejegyzést?',
      [
        {
          text: 'Mégse',
          onPress: () => console.log('Mégse'),
          style: 'cancel',
        },
        {
          text: 'Törlés',
          onPress: () => {
            console.log('Törlés');
            deleteHistoryById(item.id);
            setHistory((prevHistory) => {
              return prevHistory.filter((entry) => entry.id !== item.id);
            });
            props.toggleSwitch();
          },
        },
      ],
      { cancelable: false }
    );
  };  

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.itemContentWrapper}>
        <View style={styles.historyTextContainer}>
          <Text style={styles.currentStateText}>
            {item.date.toDate().toLocaleString('hu-HU')}
          </Text>
          <Text
            style={[
              styles.currentStateText,
              item.state === 'in'
                ? styles.currentStateTextIn
                : styles.currentStateTextOut,
            ]}>
            {item.state === 'in' ? 'bejött' : 'távozott'}
          </Text>
        </View>
        {index === 0 && (
        <TouchableOpacity onPress={() => showDeleteConfirmation(item,)}>
          <Image source={trashIcon} style={styles.trashIcon} />
        </TouchableOpacity>
        )}
      </View>
    </View>
  );

  useEffect(() => {
    // async IIFE
    (async () => {
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList data={history} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  trashIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});