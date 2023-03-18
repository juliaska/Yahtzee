import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: 'purple',
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: 'purple',
    flexDirection: 'row',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Orbitron',
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'Exo2'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#ffc4ff",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20,
    fontFamily: 'Exo2'
  },
  points: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 15,
    textAlign: 'center',
  },
  dicePoints: {
    flexDirection: 'row',
    width: 280,
    alignContent: 'center',
    
  },
  textHome:{
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Exo2'
  },
  textInput: {
    height: 50,
    fontSize: 20,
    textAlign: 'center',
  },

   buttonHome:{
        backgroundColor: '#c0c0c0',
        marginTop: 20,
        alignSelf: 'center',
        textAlign: 'center',
        width: 70,
        borderRadius: 15,
        height: 30,
        justifyContent: 'center',
   },
   buttonHomeText:{
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Exo2'
   },

   textRules: {
        padding: 15,
        textAlign: 'center',
        fontFamily: 'Exo2'
   },
   tableTextHeadings: {
      color: "black",
      fontSize: 18,
      fontFamily: 'Exo2',
    },

    tableText: {
      color: "black",
      fontSize: 15,
      fontFamily: 'Exo2',
    },

});