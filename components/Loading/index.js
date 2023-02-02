import React from 'react';
import {
  Image,
  View,
} from 'react-native';

import styles from './styles';

import appIcon from '../../assets/fuego.png';


function Loading( ) {
  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        style={{
          width: 120,
          height: 120,
          resizeMode: 'stretch',
        }}
      />
    </View>
  );
}

export default Loading;
