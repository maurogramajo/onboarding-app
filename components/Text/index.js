import React from 'react';

import {
  Text,
  StyleSheet,
} from 'react-native';

function TextComponent({
  children,
  fontSize = 16,
  // truncated,
  bold,
  underline,
  fontWeight = '400',
  color = '#FCFCFC',
  onPress,
  textAlign = 'auto',
  fontStyle = 'normal',
  padding = 4,
  width,
  style = {},
  backgroundColor = 'transparent',
  marginHorizontal,
  marginTop,
  linkLine,
}) {
  const styles = {
    fontFamily: 'normal',
    ...style,
  };

  if (color) styles.color = color;

  if (fontSize) {
    styles.fontSize = parseInt(fontSize, 10);
  }

  if (underline) {
    styles.textDecorationLine = 'underline';
  }

  if (fontWeight) {
    styles.fontWeight = fontWeight;
  }

  if (bold) {
    styles.fontWeight = 'bold';
    styles.fontFamily = 'normal';
  }

  if (textAlign) {
    styles.textAlign = textAlign;
  }

  if (padding) {
    styles.padding = padding;
  }

  if (width) {
    styles.width = width;
  }

  if (fontStyle) {
    styles.fontStyle = fontStyle;
  }

  if (backgroundColor) {
    styles.backgroundColor = backgroundColor;
  }

  if (marginHorizontal) {
    styles.marginHorizontal = marginHorizontal;
  }

  if (marginTop) {
    styles.marginTop = marginTop;
  }

  if (linkLine) {
    styles.textDecorationLine = 'underline';
    styles.fontSize = 18;
    styles.color = '#eee';
    styles.textAlign = 'center';
    styles.backgroundColor = '#00000088';
    styles.padding = 10;
    styles.marginHorizontal = 20;
    styles.marginTop = 50;
    styles.borderRadius = 20;
  }

  const localStyle = StyleSheet.create({
    container: { ...styles },
  });

  return (
    <Text
      style={localStyle.container}
      onPress={onPress}
    >
      {children}
    </Text>
  );
}

export default TextComponent;
