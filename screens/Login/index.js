import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import i18next from '../../utils/i18n';

import {
  login,
  validateEmailAndCode,
} from '../../libs/users';

import AuthContext from '../../providers/AuthContext';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Toast from '../../components/Toast';

import styles from './styles';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sendCode, setSendCode] = useState(false);
  const [showError, setShowError] = useState('');
  const context = useContext(AuthContext);

  const { t } = useTranslation();

  async function onLogin() {
    try {
      if (code.trim() === '') {
        return setShowError(`${i18next.t('login.emptycode')}`);
      }
      const logged = await validateEmailAndCode(email, code);
      context.setToken(logged.jwt);
      return navigation.navigate('Home', {});
    } catch (err) {
      console.info('Error login: ', err);
      return setShowError(`${i18next.t('login.loginfail')}`);
    }
  }

  async function onSendCode() {
    try {
      if (email.trim() === '') {
        return setShowError(`${i18next.t('login.emptyemail')}`);
      }
      await login(email);
      return setSendCode(!sendCode);
    } catch (err) {
      console.error('Error login: ', err);
      return null;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formData}>
        <View style={styles.formDataFields}>
          { !sendCode && (
            <>
              <Input
                label="E-Mail"
                value={email}
                onChange={setEmail}
                keyboardType="email-address"
                placeholder={i18next.t('login.emailplaceholder')}
              />
              <Button
                title={i18next.t('login.sendcode')}
                onPress={() => onSendCode()}
                backgroundColor="#ffcc00"
                textColor="#000000"
                bold
                width='50%'
              />
            </>
          )}

          { sendCode && (
            <>
              <Input
                label={i18next.t('login.insertcode')}
                value={code}
                onChange={setCode}
                placeholder="FG778A"
              />
              <Button
                title={i18next.t('login.login')}
                onPress={() => onLogin()}
                backgroundColor="#ffcc00"
                textColor="#000000"
                bold
                width='50%'
              />
            </>
          )}
        </View>
        { sendCode && (
          <Text
            onPress={() => onSendCode()}
            linkLine
          >
            {i18next.t('login.sendnewcode')}
          </Text>
        )}
      </View>
      {showError !== '' && (<Toast type="normal" onClose={() => setShowError('')}>{showError}</Toast>)}
      <StatusBar style="light"/>
    </View>
  );
}

export default LoginScreen;