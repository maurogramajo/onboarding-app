import { View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import biometricsAuth from "../../utils/biometricauth";
import Loading from "../../components/Loading";

import styles from "./styles";

export default function LoadingScreen() {
  const navigation = useNavigation();

  async function checkBiometric() {
    const biometricResult = await biometricsAuth();

    if(biometricResult)
      navigation.navigate('Home', {});
  }

  checkBiometric();

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
}