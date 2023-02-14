import React, { useState, useEffect } from 'react';

import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import checkUpdate from './helpers/update';

import AuthProviderContext from './providers/AuthProvider';

import { storeData } from './StorageData';

import { View } from 'react-native';
import Loading from './components/Loading';
import AppRoutes from './components/AppRoutes';

SplashScreen.preventAutoHideAsync()
  .catch(console.warn); // it's good to explicitly catch and inspect any error

function App() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        await storeData('init', 'initStatus');
        //await checkUpdate();
        setInit(true);
        await SplashScreen.hideAsync();
      } catch (err) {
        console.info('Something went wrong: ', err);
      }
    };
  
    initApp();
  }, []);  

  if (init) {
    return (
      <AuthProviderContext>
        <ShowApp />
      </AuthProviderContext>
    );
  }
  return (
    <View
      style={{
        width: '100%',
        width: '100%',
        flex: 1,
        backgroundColor: '#0B1626',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Loading />
    </View>
  );
}

function ShowApp() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
    return () => {
      // clearInterval(id);
    };
  }, [initialized]);

  if (!initialized) {
    return (<Loading />);
  }

  return (
    <ActionSheetProvider>
      <AppRoutes />
    </ActionSheetProvider>
  );
}

export default App;
