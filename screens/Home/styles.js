import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1626',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userFrame: {
    width: '90%',
    height: 400,
    backgroundColor: '#2e476b',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  pictureFrame: {
    width: 184,
    height: 184,    
    backgroundColor: 'white',
    borderColor: '#ffcc00',
    borderRadius: 92,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhoto: {
    width: 180,
    height: 180,
    borderRadius: 90,
    resizeMode: 'center',   
  },
  editableProfilePhoto: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: -5,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoFrame: {
    width: '90%',
    flexDirection: 'column',
  },
  textFrame: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default styles;