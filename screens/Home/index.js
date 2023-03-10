import React, {
  useContext,
  useState,
  useEffect,
} from 'react';

import { View, Image, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import i18next from '../../utils/i18n';

import AuthContext from '../../providers/AuthContext';
import { getUserProfilePhoto } from '../../helpers/images';
import { uploadFile } from '../../libs/api';
import { updateUser, getUserData } from '../../libs/users';

import Text from '../../components/Text';
import Pressable from '../../components/Pressable';
import Menu from '../../components/Menu';
import Loading from '../../components/Loading';
import EditableText from './components/EditableText';
import LanguageSelector from '../../components/LanguageSelector';

import styles from './styles';

function HomeScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const context = useContext(AuthContext);

  const {
    userData,
    setUserData,
  } = context;

  const { _id } = route.params;

  async function fetchUserInfo() {
    try {
      setLoading(true);
      if(!_id) {
        setUserInfo(userData);
      }
      else {
        const response = await getUserData(_id, true);
        setUserInfo(response);
      }
    } catch (err) {
      console.error('error fetchUserInfo: ', err);
    } finally {
      setLoading(false);
    }
  }

  async function pickImage(type = 'photo') {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setLoading(true);
        const key = type === 'photo' ? 'profilePhoto' : 'coverPhoto';
        const uploaded = await uploadFile(result.assets[0], 'profilePhotos');
        const updated = await updateUser({
          [key]: uploaded.resolutions['640x640'].url,
        });
        setUserData(updated.userData, updated.jwt);
        setUserInfo(updated.userData);
      }
    } catch (err) {
      console.error('Error updating profilePhoto: ', err);
    } finally {
      setLoading(false);
    }
  }

  async function onChangeUserInfo(type, text, main = false) {
    try {
      setLoading(true);
      let updated = null;
      if (main) {
        updated = await updateUser({
          [type]: text,
        });
      } else {
        updated = await updateUser({
          extra: { [type]: text },
        });
      }
      setUserData(updated.userData, updated.jwt);
      setUserInfo(updated.userData);
    } catch (err) {
      console.error('Error updating userdata: ', err);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // your code here
        return true; // return true to prevent going back
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

  useEffect(() => {
    if (userData) {
      fetchUserInfo(userData);
    } 
  }, [_id, userData]);

  if (!userInfo) {
    return (
    <View style={styles.container}>
      <Loading />
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <LanguageSelector />
      <View style={styles.userFrame}>
        <Text
          fontSize={30}
          bold
        >{i18next.t('home.title')}</Text>
        <Text
          fontSize={30}
          bold
        >HOLA MUNDO</Text>
        <View style={styles.pictureFrame}>
          <Image
            style={styles.profilePhoto}
            source={getUserProfilePhoto(userInfo.profilePhoto)}
          />
          <Pressable
            style={styles.editableProfilePhoto}
            onPress={() => {pickImage('photo')}}
          >
            <MaterialCommunityIcons name="image-edit" size={40} color="white" />
          </Pressable>
        </View>
        <View style={styles.infoFrame}>
          <EditableText
            label={i18next.t('home.name')}
            value={!(userInfo.firstName)? 'NoName' : userInfo.firstName}
            setValue={(v) => onChangeUserInfo('firstName', v, true)}
          />
          <EditableText
            label={i18next.t('home.lastname')}
            value={!(userInfo.lastName)? 'NoLastName' : userInfo.lastName}
            setValue={(v) => onChangeUserInfo('lastName', v, true)}
          />
        </View>
      </View>
      <Menu />
      {loading && <Loading />}
    </View>
  );
}

export default HomeScreen;