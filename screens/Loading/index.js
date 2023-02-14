import React from 'react';
import { View, Alert, BackHandler } from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import biometricsAuth from "../../utils/biometricauth";
import Loading from "../../components/Loading";

import i18next from '../../utils/i18n';

import styles from "./styles";

export default function LoadingScreen() {
  const navigation = useNavigation();

  async function checkBiometric() {
    const biometricResult = await biometricsAuth();
    
    // WHAT HAPPENS WHEN USER HAS NOT ANY SECURITY PATTERN, PIN NEITHER BIOMETRIC AUTHENTICATION??
    switch(biometricResult) {
      case true:
        navigation.navigate('Home', {});
        break;
      case undefined:
        Alert.alert(
          `${i18next.t('authentication.retrytitle')}`, `${i18next.t('authentication.retrymessage')}`,
          [
            {text: 'OK', onPress: () => checkBiometric()},
          ]
        );
        break;
      default:
        Alert.alert(
          `${i18next.t('authentication.failtitle')}`, `${i18next.t('authentication.failmessage')}`,
          [
            {text: 'OK', onPress: () => checkBiometric()},
          ]
        );
        break;
    }      
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // your code here
        return true; // return true to prevent going back
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  checkBiometric();

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
}