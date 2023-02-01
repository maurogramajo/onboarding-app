import React, {
  useState,
  useEffect,
} from 'react';

import {
  TextInput,
  View,
} from 'react-native';

import Text from '../Text';

import styles from './styles';

function InputComponent({
  multiline,
  label,
  colorLabel,
  fontSizeLabel = 18,
  placeholder = 'Placeholder',
  placeholderTextColor = '#49556a',
  onChange = () => {},
  value,
  secureTextEntry = false,
  keyboardType = 'default',
  maxLength,
  editable = true,
  type = 'none',
  backgroundColor = '#233143',
  backgroundColorFocus = '#233143',
  color = '#FCFCFC',
  colorFocus = '#eee',
}) {
  const [localValue, setLocalValue] = useState('');
  const [localColor, setLocalColor] = useState(color);
  const [localBackgroundColor, setLocalBackgroundColor] = useState(backgroundColor);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <View
      style={styles().container}
    >
      {label && (
        <Text
          color={colorLabel}
          fontSize={fontSizeLabel}
        >
          {`${label}`}
        </Text>
      )}
      <TextInput
        style={styles(localColor, localBackgroundColor).txtinput}
        multiline={multiline}
        maxLength={maxLength}
        autoCapitalize="none"
        value={localValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={setLocalValue}
        editable={editable}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        size="full"
        type={type}
        onBlur={() => {
          setLocalBackgroundColor(backgroundColor);
          setLocalColor(color);
        }}
        onFocus={() => {
          setLocalBackgroundColor(backgroundColorFocus);
          setLocalColor(colorFocus);
        }}
        onEndEditing={() => {
          onChange(localValue);
          setLocalColor(color);
        }}
      />
    </View>
  );
}

export default InputComponent;
