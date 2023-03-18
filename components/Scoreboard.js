import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {DataTable} from 'react-native-paper';
import style from '../styles/style';
import Header from './Header';
import Footer from './Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY } from "../constants/Game";



export default Scoreboard = ( {navigation} ) => {

const [scores, setScores] = useState([]);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    getScoreBoardData();
  });
  return unsubscribe;
}, [navigation]);

const getScoreBoardData = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
       
      }
  }
  catch (error) {
  console.log('Read error: ' + errormessage);
}
};



    return(
        
      <View>
        <Header></Header>
        <DataTable>
          <DataTable.Header
            style={{
              backgroundColor: "white",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          >
            <DataTable.Title
              textStyle={style.tableTextHeadings}
            >
              Name
            </DataTable.Title>
            <DataTable.Title
              textStyle={style.tableTextHeadings}
            >
              Date & Time
            </DataTable.Title>
            <DataTable.Title
              textStyle={style.tableTextHeadings}
            >
              Score
            </DataTable.Title>
          </DataTable.Header>

          {scores.map((player, i) => (
            <DataTable.Row key={i + 1} style={{ backgroundColor: "white" }}>
              <DataTable.Cell textStyle={style.tableText}>
                {player.name}
              </DataTable.Cell>
              <DataTable.Cell textStyle={style.tableText}>
                {player.date} {player.time}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={style.tableText}>
                {player.points}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable> 
      <Footer> </Footer>
      </View>
   
  );
};
