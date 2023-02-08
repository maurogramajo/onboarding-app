import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
// Using the provided hook
import { useActionSheet } from '@expo/react-native-action-sheet';

import i18next from '../../utils/i18n';

import AuthContext from '../../providers/AuthContext';

import Button from '../Button';

export default function Menu() {
  const { showActionSheetWithOptions } = useActionSheet();
  const context = useContext(AuthContext);
  const navigation = useNavigation();

  const {
    logout,
  } = context;

  function handleLogout() {
    logout();
    navigation.navigate('Login');
  };

  const onPress = () => {
    const options = [`${i18next.t('menu.logout')}`, `${i18next.t('menu.cancel')}`];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case destructiveButtonIndex:
          // Logout
          handleLogout();
          break;
        case cancelButtonIndex:
          // Canceled
      }});
  }

  return (
    <Button title={i18next.t('menu.title')} onPress={onPress} bold bottom={0} position="absolute"/>
  )
};