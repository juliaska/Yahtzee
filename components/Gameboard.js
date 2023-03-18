import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import style from "../styles/style";
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY, BONUS_POINTS, BONUS_POINTS_LIMIT } from "../constants/Game";
import { Col, Grid } from "react-native-easy-grid";
import Header from "./Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = [];
let counter = 6;

export default Gameboard = ({ route }) => {
  const [playerName, setPlayerName] = useState("");
  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [nbrOfWins, setNbrOfWins] = useState(0);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState("");
  const [bonusState, setBonusState] = useState("");

  const [selectedDices, setSelectedDices] = useState(
    new Array(NBR_OF_DICES).fill(false)
  );
  const [selectedDicePoints, setSelectedDicesPoints] = useState(
    new Array(MAX_SPOT).fill(false)
  );
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  const [dicePointsTotal, setdicePointsTotal] = useState(
    new Array(MAX_SPOT).fill(0)
  );
  const [end, setEnd] = useState(false);
  const [bonus, setBonus] = useState(false);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (playerName === "" && route.params?.player) {
      setPlayerName(route.params.player);
      getScoreBoardData();
    }
  }, []);

  useEffect(() => {
   
    const newSum = dicePointsTotal.reduce((total, points) => total + points, 0);
    setSum(newSum);
  }, [dicePointsTotal]);

  const row = [];

  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable key={"row" + i} onPress={() => selectDice(i)}>
        <MaterialCommunityIcons
          name={board[i]}
          key={"row" + i}
          size={50}
          color={getDiceColor(i)}
          style={{ alignSelf: "center" }}
        ></MaterialCommunityIcons>
      </Pressable>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={style.points}>
          {getSpotTotal(spot)}
        </Text>
      </Col>
    );
  }

  const buttonsRow = [];
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    buttonsRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable
          onPress={() => selectDicePoints(diceButton)}
          key={"buttonsRow" + diceButton}
        >
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={40}
            color={getDicePointsColor(diceButton)}
          >
          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    );
  }

  const [pointsSaved, setPointsSaved] = useState(false);
  
  useEffect(() => {
    if (nbrOfThrowsleft === 0) {
      setStatus("Select your points");
    }
    if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    } else if (selectedDicePoints.every((x) => x) && !pointsSaved) {
      savePlayerPoints();
      console.log("saved player points");
      setPointsSaved(true);
    }
  }, [nbrOfThrowsleft, selectedDicePoints, pointsSaved]);


  function getDiceColor(i) {
      return selectedDices[i] ? "black" : "#ffc4ff";
  }

  function getDicePointsColor(i) {
    if (selectedDicePoints[i]) {
      return "black";
    }
    else {
      return "purple";
    }
  }

  function selectDicePoints(i) {
    if (nbrOfThrowsleft === NBR_OF_THROWS) {
      setStatus("You have to throw the dices first.");
      return;
    }
    let selected = [...selectedDices];
    let selectedPoints = [...selectedDicePoints];
    let points = [...dicePointsTotal];
    let total = sum;
   
    if (nbrOfThrowsleft < 1) {
    if (!selectedPoints[i]) {
      selectedPoints[i] = true;
      let nbrOfDices = diceSpots.reduce((total, x) =>
        (x === (i + 1) ? total + 1 : total),0);

      points[i] = nbrOfDices * (i + 1);
      setdicePointsTotal(points);
      selected.fill(false);
      setSelectedDices(selected);
      setSelectedDicesPoints(selectedPoints);
      setNbrOfThrowsleft(NBR_OF_THROWS);

      counter -= 1;
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        resetDices();

        let temp = BONUS_POINTS_LIMIT - (total + points[i]);
        let check = total + points[i];
        if (check >= BONUS_POINTS_LIMIT) {
          setBonusState("You have reached the bonus");
          if (!bonus) {
            setSum(total + points[i] + BONUS_POINTS);
            setBonus(true);
            return points[i];
          }
        } else {
          setBonusState(" You are " + temp + " points away from the bonus");
        }
        setSum(total + points[i]);
       
    }
    else {
      setStatus('Already selected, choose a different number');
    }
  } 
  else { 
    setStatus('Throw 3 times before setting points');
}
   
  
    return points[i];
  }

  const selectDice = (i) => {
    if (nbrOfThrowsleft === 3) {
      setStatus("You have to throw the dices first.")
  } else {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }
}

  function getSpotTotal(i) {
    return dicePointsTotal[i];

  }

  const throwDices = () => {
    let spots = [...diceSpots];
    
      if (nbrOfThrowsleft === 0) {
        setStatus('Select a number before you throw again');
        setDiceSpots(spots);
        return;
      }
      else {

    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = "dice-" + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsleft(nbrOfThrowsleft - 1);
    setDiceSpots(spots);
    setStatus('Throw again');
      }
  };
  const resetDices = () => {
    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = "dice-" + randomNumber;
      spots[i] = randomNumber;
    }
    setNbrOfThrowsleft(nbrOfThrowsleft - 1);
    setDiceSpots(spots);
    setStatus("Throw again");
  };

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsleft > 0) {
      setStatus("You won");
    } 
    else if (
      board.every((val, i, arr) => val === arr[0]) && counter === 0) {
      
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setStatus("You won, game over");
    } else if (counter === 0) {
      setStatus("Game over");
      setNbrOfThrowsleft(0);
      setEnd(true);
      if (bonus) {
        setBonusState(" You reached the bonus!");
      } else {
        setBonusState(" You didn't reach the bonus");
      }
    } else {
      setStatus("Keep on throwing");
    }
  };
  const reset = () => {
    resetDices();
    setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    setStatus("");
    setBonusState("");
    setBonus(false);
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setSum(0);
    setSelectedDicesPoints(new Array(MAX_SPOT).fill(false));
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setdicePointsTotal(new Array(MAX_SPOT).fill(0));
    counter = 6;
    setEnd(false);
  };


  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsleft === NBR_OF_THROWS) {
      setStatus("Throw dices");
    }
    if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS - 1);
    }
  }, [nbrOfThrowsleft]);

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
}

const savePlayerPoints = async () => {
  const currentDate = new Date();
    const playerPoints = {
      name: playerName,
      date: `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()}`,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
      points:
        sum >= BONUS_POINTS_LIMIT ? sum + BONUS_POINTS : sum,
    };
    try {
      const newScore = [...scores, playerPoints]
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);
      setScores(newScore);
      console.log(newScore);
      const jsonValue = JSON.stringify(newScore);
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <View style={style.gameboard}>
      <Header></Header>
      <View style={style.flex}>
      {selectedDicePoints.every((v) => !v) && nbrOfThrowsleft == 3 ? (
        <MaterialCommunityIcons
          name="dice-multiple"
          size={100}
          color="#ffc4ff"
        />
      ) : (
        row
      )}
    </View>

      <Text style={style.gameinfo}>Sum: {sum}</Text>
      
      <Text style={style.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
      <Text style={style.gameinfo}>{status}</Text>

      {end ? (
        <Pressable style={style.button} onPress={() => reset()}>
          <Text style={style.buttonText}>Play again</Text>
        </Pressable>
      ) : (
      <Pressable style={style.button} onPress={() => throwDices()}>
        <Text style={style.buttonText}>Throw dices</Text>
      </Pressable>
      )}
       <Text style= {style.gameinfo}>Bonus:{bonusState}</Text>
      <View style={style.dicePoints}>
        <Grid>{pointsRow}</Grid>
      </View>
      <View style={style.dicePoints}>
        <Grid>{buttonsRow}</Grid>
      </View>
      <Text style = {style.gameinfo}>The player is: {playerName}</Text>
      <View style={style.footer}>
      <Text style={style.title}>
        Author: Julia Wolf
      </Text>
    </View>
    </View>
  );
};
