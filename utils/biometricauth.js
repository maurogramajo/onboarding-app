import { 
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync 
} from 'expo-local-authentication';

const biometricsAuth = async () => {
  // Checking hasHardwareAsync() and isEnrolledAsync() make user not able to use PIN or other way to authenticate
  // const compatible = await hasHardwareAsync();
  // //if (!compatible) throw 'This device is not compatible for biometric authentication';
  // if(!compatible) return compatible;

  // const enrolled = await isEnrolledAsync();
  // //if (!enrolled) throw 'This device doesnt have biometric authentication enabled';
  // if(!enrolled) return enrolled;
  
  const result = await authenticateAsync()
  //if (!result.success) throw `${result.error} - Authentication unsuccessful`;
  if (result.success) return true;
}
export default biometricsAuth;