import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from 'react-redux';
import StepProgress from './StepProgress'

class DayPodometer extends React.Component {
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

    var start = new Date()
    var end = new Date()
    const UTC_OFFSET = start.getTimezoneOffset()/60
    start.setHours(0 - UTC_OFFSET)
    start.setMinutes(0)
    end.setHours(23 - UTC_OFFSET)
    end.setMinutes(59)
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({ pastStepCount: "Could not get stepCount: " + error });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
/*<Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text>
<Text>Goal: {this.props.goal}</Text>*/
  render() {
    return (
      <StepProgress progress={this.state.pastStepCount} goal={this.props.goal} />
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

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayPodometer)
