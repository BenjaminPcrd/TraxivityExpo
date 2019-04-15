import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button } from "react-native";

export default class DayPodometer extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    var end = new Date();
    var start
    if((end.getMonth() + 1) >= 10) {
      start = new Date(end.getFullYear() + "-" + (end.getMonth() + 1) + "-" + (end.getDate()));
    } else {
      start = new Date(end.getFullYear() + "-0" + (end.getMonth() + 1) + "-" + (end.getDate()));
    }
    console.log("start : " + start + "       end : " + end)
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
