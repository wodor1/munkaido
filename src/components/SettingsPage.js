// SettingsPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { signOutUser } from '../auth';

const SettingsPage = ({ setUserData }) => {
  const handleLogout = async () => {
    await signOutUser();
    setUserData(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Beállítások</Text>
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Kijelentkezés</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 30,
  },
  button: {
    margin: 50,
    alignSelf: 'stretch',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '7%',
    borderRadius: 20,
    backgroundColor: '#0091ff',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default SettingsPage;
