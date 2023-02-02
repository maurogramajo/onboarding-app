import React, {
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

import AuthContext from '../../providers/AuthContext';

import { View } from 'react-native';
import Text from '../../components/Text';
import Menu from '../../components/Menu';

import styles from './styles';

function HomeScreen() {
  const context = useContext(AuthContext);
  let actionSheet = useRef();
  var optionArray = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Cancel'];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  const {
    userData,
  } = context;

  if (!userData) return null;

  return (
    <View style={styles.container}>
      <Menu />
      <Text textAlign='center'>Home Screen</Text>
    </View>
  );
}

export default HomeScreen;