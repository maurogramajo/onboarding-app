import React from 'react';
import {
  Image,
  View,
} from 'react-native';

import { WaveIndicator } from 'react-native-indicators';

import styles from './styles';

import appIcon from '../../assets/fuego.png';


function Loading( ) {
  return (
    <View style={styles.container}>
      <WaveIndicator
        color="#db2500"
        size={160}
        count={1}
        style={{
          position: 'absolute',
          top: -20,
        }}
      />
      <Image
        source={appIcon}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'stretch',
        }}
      />
    </View>
  );
}

export default Loading;
