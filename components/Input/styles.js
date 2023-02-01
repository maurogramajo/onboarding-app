import {
  StyleSheet,
} from 'react-native';

const styles = (localColor, localBackgroundColor) => StyleSheet.create({
  container: {
    width: '90%',
    // marginBottom: 8,
  },
  txtinput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: localColor,
    backgroundColor: localBackgroundColor,
    fontSize: 16,
    width: '100%',
  },
});

export default styles;
