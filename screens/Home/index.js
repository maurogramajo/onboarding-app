import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import AuthContext from '../../providers/AuthContext';
import { getUserProfilePhoto } from '../../helpers/images';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { View, Image } from 'react-native';
import Pressable from '../../components/Pressable';
import Menu from '../../components/Menu';
import EditableText from './components/EditableText';

import styles from './styles';

function HomeScreen() {
  const context = useContext(AuthContext);

  const {
    userData,
  } = context;

  if (!userData) return null;

  return (
    <View style={styles.container}>
      <View style={styles.userFrame}>
        <View style={styles.pictureFrame}>
          <Image
            style={styles.profilePhoto}
            source={getUserProfilePhoto(userData.profilePhoto)}
          />
          <Pressable
            style={styles.editableProfilePhoto}
            onPress={() => {}}
          >
            <MaterialCommunityIcons name="image-edit" size={40} color="white" />
          </Pressable>
        </View>
        <View style={styles.infoFrame}>
          <EditableText
            label="Nombre"
            value={!(userData.firstName)? 'NoName' : userData.firstName}
          />
          <EditableText
            label="Apellido"
            value={!(userData.lastName)? 'NoLastName' : userData.lastName}
          />
        </View>
      </View>
      <Menu />
    </View>
  );
}

export default HomeScreen;