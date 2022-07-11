import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  const [playState, setPlayState] = useState(false);
  const [timerValue, setTimerValue] = useState("00:00:00");
  const ourInterval = useRef(undefined);

  const toggleState = () => {
    if (playState) {
      setPlayState(false);
      clearInterval(ourInterval.current);
      ourInterval.current = undefined;
      setTimerValue("00:00:00");
    } else {
      setPlayState(true);
      let numSeconds = 0;
      ourInterval.current = setInterval(() => {
        numSeconds += 1;
        let date_str = new Date(numSeconds * 1000).toISOString();
        setTimerValue(date_str.substring(11, 19));
      }, 1000);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{timerValue}</Text>
      <TouchableOpacity style={[styles.touchableOpacity_start, playState == false ? styles.touchableOpacity_start : styles.touchableOpacity_stop]} onPress={() => toggleState()}>
        <Text style={[styles.touchableOpacityText_start, playState == false ? styles.touchableOpacityText_start : styles.touchableOpacityText_stop]}>{playState == false ? "START" : "STOP"}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 80,
    fontWeight: "bold",
    color: "white",
    marginBottom: 50
  },
  touchableOpacity_stop: {
    backgroundColor: "black",
    borderWidth: 7,
    borderColor: "red"
  },
  touchableOpacity_start: {
    width: "80%",
    height: 80,
    borderRadius: 50,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  touchableOpacityText_start: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center"
  },
  touchableOpacityText_stop: {
    color: "red",
  },
});
