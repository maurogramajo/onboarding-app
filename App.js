import React, { useState, useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import AppProviderContext from './providers/AuthProvider';

import { storeData } from './StorageData';

import Routes from './components/AppRoutes';
import Loading from './components/Loading';

SplashScreen.preventAutoHideAsync()
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await storeData('init', 'initStatus');
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    
    prepare();
  }, []);


  if (appIsReady) {
    return (
      <AppProviderContext>
        <ActionSheetProvider>
          <Routes />
        </ActionSheetProvider>
      </AppProviderContext>
    );
  }

  return (
    <Loading />
  );
}