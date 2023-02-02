import React from 'react';

import {
  TouchableOpacity,
  View,
} from 'react-native';

import Text from '../Text';

import styles from './styles';

function ButtonComponent({
  children,
  onPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  title,
  isEnable = true,
  backgroundColor = '#ffcc00',
  textColor = '#000000',
  width = '100%',
  fontSize = 16,
  paddingVertical = 10,
  marginTop = 0,
  bold,
  bottom,
  position,
}) {
  return (
    <TouchableOpacity
      style={{ width, marginTop, bottom, position }}
      onPress={() => onPress()}
      onPressIn={() => onPressIn()}
      onPressOut={() => onPressOut()}
      disabled={!isEnable}
    >
      <View style={[styles.button, { backgroundColor, paddingVertical}]}>
        {children && (
          <Text textAlign="center" color={textColor} fontSize={fontSize} bold={bold}>{children}</Text>
        )}
        {title && (
          <Text textAlign="center" color={textColor} fontSize={fontSize} bold={bold}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default ButtonComponent;
