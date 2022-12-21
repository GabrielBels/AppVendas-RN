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
  bottomButton: {
    width: '80%',
    marginBottom: 60,
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    height: 60,
    backgroundColor: '#d0557a',
  },
  mainButton: {
    backgroundColor: '#d0557a',
    borderColor: 'lightgray',
    borderWidth: '1',
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    height: 60,
    justifyContent: 'center'
  }
});
