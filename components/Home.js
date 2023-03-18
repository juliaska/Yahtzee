import React, { useState, useEffect } from 'react';
import {Text, View, TextInput,Pressable,Keyboard, Button, TouchableOpacity} from 'react-native';
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_SPOT, MIN_SPOT, NBR_OF_DICES, NBR_OF_THROWS } from '../constants/Game';
import style from '../styles/style';


export default Home = ({navigation}) => {

    const[playerName, setplayerName] = useState('');
    const[hasPlayerName, sethasPlayerName] = useState(false);

const handlePlayerName = (value) => {
    if(value.trim().length > 0){
        sethasPlayerName(true);
        Keyboard.dismiss();
    }

}

    return(
        <View> 
            <View style={style.header}>
            <Text style={style.title}>
            Mini-Yahtzee
            </Text>
            </View>
            {!hasPlayerName
                ?
            <>
            <Text style = {style.textHome}>For Scoreboard enter your name: </Text>
                <TextInput style={style.textInput} onChangeText={setplayerName} autoFocus={true}></TextInput>

                <TouchableOpacity style = {style.buttonHome} onPress={() => handlePlayerName(playerName)}>
                    <Text style = {style.buttonHomeText}>OK</Text>
                </TouchableOpacity>
             
            </>
            :
            <>
                <Text style= {style.textHome}>Rules of the game</Text>
                <Text style = {style.textRules}>
                THE GAME: Upper section of the classic Yahtzee dice game. You have {NBR_OF_DICES} dices and
                for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                order to get same dice spot counts as many as possible. In the end of the turn you must select
                your points from {MIN_SPOT} to {MAX_SPOT} .Game ends when all points have been selected.
                The order for selecting those is free.</Text>
                <Text style = {style.textRules}>
                POINTS: After each turn game calculates the sum
                for the dices you selected. Only the dices having
                the same spot count are calculated. Inside the
                game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again. </Text>
                <Text style = {style.textRules}>
                GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                getting bonus which gives you {BONUS_POINTS} points more.
                </Text>
                <Text style= {style.textHome}>Good luck, {playerName}</Text>

                <Pressable style={style.buttonHome} onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
                    <Text style={style.buttonHomeText}>Play</Text>
                </Pressable>
            </>
            }
    <View style={style.footer}>
      <Text style={style.title}>
        Author: Julia Wolf
      </Text>
    </View>
            
        </View>
    )
}