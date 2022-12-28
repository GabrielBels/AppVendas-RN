import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    backgroundColor: '#d0557a'
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  container: {
    flex: 2,
    paddingTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centralized: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  fontFamily: {
    fontFamily: ''
  },
  mainButton: {
    width: '80%',
    height: 60,
    borderColor: 'lightgray',
    backgroundColor: "#d0557a",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
