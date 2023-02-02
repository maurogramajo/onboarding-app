import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1626',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  formData: {
    width: '100%',
    flexDirection: 'column',
    height: 200,
    justifyContent: 'center',
  },
  formDataFields: {
    height: 200,
    backgroundColor: '#000000a5',
    paddingVertical: 20,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    borderRadius: 20,
  },
});

export default styles;