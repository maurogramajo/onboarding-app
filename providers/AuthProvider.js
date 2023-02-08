import React, {
  useState,
  useEffect,
} from 'react';

import jwtDecode from 'jwt-decode';
import NetInfo from '@react-native-community/netinfo';
import { localization, getLocales } from 'expo-localization';

import i18n from '../utils/i18n';

import { AuthProvider } from './AuthContext';

import {
  getData,
  storeData,
  sessionLocalKey,
  clearAllLocalStorage,
} from '../StorageData';

function AppProviderContext({ children }) {
  const [logged, setLogged] = useState(false);
  const [userData, setUserData] = useState();
  const [languageCode, setLanguageCode] = useState();
  const [networkStatus, setNetworkStatus] = useState({
    connected: false,
    connectedType: null,
  });
  const [userLocales, setUserLocales] = useState();

  const [localData, setLocalData] = useState();

  async function logout() {
    clearAllLocalStorage();
    setLogged(false);
    setUserData();
  }

  async function getStorageData(key) {
    try {
      const localStorage = await getData(key);
      if (!key) setLocalData(localStorage);
      return localStorage;
    } catch (err) {
      console.error(`Error getStorageData: ${err}`, 'AuthProvider.js');
    }
    return null;
  }

  async function getCurrentNetworkStatus() {
    try {
      const currentNetworkStatus = await NetInfo.fetch();
      setNetworkStatus({
        connected: currentNetworkStatus.isConnected,
        connectedType: currentNetworkStatus.type,
      });
      return {
        connected: currentNetworkStatus.isConnected,
        connectedType: currentNetworkStatus.type,
      };
    } catch (err) {
      console.error(`getCurrentNetworkStatus Error: ${err}`, 'AuthProvider.js');
    }
    return { connected: false, connectedType: null };
  }

  async function getUserLocales() {
    try {
      const currentLocales = getLocales();
      await storeData(currentLocales, 'currentLocalesStoraged');
      setUserLocales(currentLocales);
      setLanguageCode(currentLocales[0].languageCode);
      i18n.changeLanguage(currentLocales[0].languageCode);
    } catch (err) {
      console.error(`getUserLocales error: ${err}`, 'AuthProvider.js');
      return null;
    }
  }

  async function getLocalToken() {
    try {
      await Promise.all([
        getStorageData(),
        getCurrentNetworkStatus(),
        getUserLocales(),
      ])

      const localToken = await getData(sessionLocalKey);
      if (localToken) {
        setLogged(true);
        const decoded = jwtDecode(localToken.jwt);
        await setUserData({
          ...decoded,
          _id: decoded.uuid,
          displayName: `${decoded.firstName || 'NoName'} ${decoded.lastName || 'NoLast'}`,
        });
      }
      await storeData('end', 'initStatus');
    } catch (err) {
      console.error(`Error getLocalToken process: ${err}`, 'AuthProvider.js');
    }
  }

  useEffect(() => {
    getLocalToken();
    let unsubscribe = () => {};
    try {
      let firstTime = true;
      unsubscribe = NetInfo.addEventListener((currentNetworkStatus) => {
        if (firstTime) {
          firstTime = false;
          return;
        }
        setNetworkStatus({
          connected: currentNetworkStatus.isConnected,
          connectedType: currentNetworkStatus.type,
        });
      });
    } catch (err) {
      console.error(`error effect interval location and network: ${err}`, 'AuthProvider.js');
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthProvider
      value={{
        localData,
        userData,
        setUserData: (nuserData, jwt) => {
          setUserData(nuserData);
          if (jwt) {
            storeData({ jwt }, sessionLocalKey);
          }
        },
        languageCode,
        setLanguageCode,
        logged,
        ...networkStatus,
        ...userLocales,
        storeData,
        getStorageData,
        setToken: (value) => {
          storeData({ jwt: value }, sessionLocalKey);
          getLocalToken();
        },
        logout,
      }}
    >
      {children}
    </AuthProvider>
  );
}

export default AppProviderContext;
