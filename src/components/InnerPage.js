import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HistoryPage from './HistoryPage';
import StatusPage from './StatusPage';
import SettingsPage from './SettingsPage'; // Új import

const Stack = createNativeStackNavigator();

const InnerPage = ({ userData, setUserData }) => {
  const toggleSwitch = (prevState) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      state: prevState === 'in' ? 'out' : 'in',
    }));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Munkaidő Nyilvántartó">
          {navigatorProps => (
            <StatusPage
              {...navigatorProps}
              setUserData={setUserData}
              userData={userData}
              toggleSwitch={toggleSwitch} // Hozzáadva itt
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Napló">
          {navigatorProps => (
            <HistoryPage
              {...navigatorProps}
              userData={userData}
              toggleSwitch={toggleSwitch} // Hozzáadva itt
            />
          )}
        </Stack.Screen>
        {/* Új navigációs elem: Beállítások */}
        <Stack.Screen name="Beállítások">
          {navigatorProps => (
            <SettingsPage {...navigatorProps} setUserData={setUserData} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default InnerPage;
