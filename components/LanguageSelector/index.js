import React, { useContext } from 'react';
// Using the provided hook
import { useActionSheet } from '@expo/react-native-action-sheet';

import i18next from '../../utils/i18n';

import AuthContext from '../../providers/AuthContext';

import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Pressable from '../Pressable';
import Text from '../Text';

import styles from './styles';

function LanguageSelector() {
  const { languageCode, setLanguageCode } = useContext(AuthContext);

  const handlePress = () => {
    const currLanguage = (languageCode === 'es')? 'en':'es';

    setLanguageCode(currLanguage);
    i18next.changeLanguage(currLanguage);
  };

  return(
    <View style={styles.container}>
      <Text>{(languageCode === 'es')? 'Español':'English'}</Text>
      <Pressable
        onPress={handlePress}
      >
        <MaterialIcons name="language" size={30} color="#ffcc00" />
      </Pressable>
    </View>
  );

}

export default LanguageSelector;