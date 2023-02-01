import React, {
  useEffect,
  useRef,
} from 'react';

import {
  Animated,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Pressable from '../Pressable';

import Text from '../Text';

function ToastComponent({
  children,
  type = 'danger',
  onClose = () => {},
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function hideToast() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    onClose();
  }
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      hideToast();
    }, 10000);
  }, []);

  const styles = {
    position: 'absolute',
    opacity: fadeAnim,
    width: '80%',
    bottom: 20,
    backgroundColor: '#ff0000CC',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#cc0000',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  };

  if (type === 'normal') {
    styles.backgroundColor = '#3495ebCC';
    styles.borderColor = '#3446eb';
  }
  return (
    <Animated.View
      style={styles}
    >
      <Pressable
        onPress={() => hideToast()}
        style={{
          width: '100%',
        }}
      >
        <AntDesign name="close" size={24} color="white" />
      </Pressable>
      <Text>{children}</Text>
    </Animated.View>
  );
}

export default ToastComponent;
