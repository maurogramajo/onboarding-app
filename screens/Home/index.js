import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import AuthContext from '../../providers/AuthContext';

import { View } from 'react-native';
import Text from '../../components/Text';

import styles from './styles';

function HomeScreen({ onLayout }) {
  const context = useContext(AuthContext);
  const {
    userData,
  } = context;

  if (!userData) return null;

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;