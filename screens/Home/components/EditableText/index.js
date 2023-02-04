import React, { useState, useRef, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 

import { View, TextInput } from 'react-native';
import Text from '../../../../components/Text';
import Input from '../../../../components/Input';
import Pressable from '../../../../components/Pressable';

import styles from './styles';

function EditableText({
  label = 'label',
  value = 'default',
  setValue = () => {},
  fontSize = 18,
  color = 'white',
}) {
  const [editable, setEditable] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const refInput = useRef(null);

  const handleEdit = () => {
    setEditable(true);
    setTimeout(() => refInput.current.focus(), 50);
  }

  const handleUpdate = () => {
    setEditable(false);
    setValue(localValue);
  }

  const handleLeftUpdate = () => {
    setLocalValue(value);
    setEditable(false);
  }

  return(
    <View style={styles.container}>
      <View style={styles.labelFrame}>
        <Text color={color} fontSize={fontSize}>{`${label}`}</Text>
        <Text color={color} fontSize={fontSize}>:</Text>
      </View>
      <TextInput
        inputMode='text'
        value={localValue}
        onChangeText={setLocalValue}
        ref={refInput}
        editable={editable}
        selectTextOnFocus
        color={color}
        style={{
          width: '40%',
          fontSize,
        }}
        onSubmitEditing={handleUpdate}
      />
      <Pressable
        onPress={!(editable) ? handleEdit : handleUpdate}
        style={{
          width: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!(editable)?
          <MaterialIcons name="edit" size={24} color={color} /> :
          <MaterialIcons name="check-circle" size={24} color="#09e61c" />
        }
      </Pressable>      
    </View>
  );
}

export default EditableText;

//{!(userData.firstName)? 'NoName': userData.firstName}