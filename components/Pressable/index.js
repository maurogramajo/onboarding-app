import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';

function PressableComponent({
  children,
  onLongPress = () => {},
  onPressIn = () => {},
  onPress = () => {},
  onPressOut = () => {},
  disabled = false,
  style = {},
}) {
  return (
    <TouchableOpacity
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPress={onPress}
      onPressOut={onPressOut}
      disabled={disabled}
      style={style}
    >
      {children}
    </TouchableOpacity>
  );
}

export default PressableComponent;
