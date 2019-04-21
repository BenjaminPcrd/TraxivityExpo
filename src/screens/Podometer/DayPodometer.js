import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import DayStepProgress from './DayStepProgress'

class DayPodometer extends React.Component {
  state = {
    loading: true,
    pastStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    var start = new Date()
    var end = new Date()
    const UTC_OFFSET = start.getTimezoneOffset()/60
    start.setHours(0 - UTC_OFFSET)
    start.setMinutes(0)
    end.setHours(23 - UTC_OFFSET)
    end.setMinutes(59)
    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps, loading: false });
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
  
  render() {
    if(this.state.loading) {
      return (<View><ActivityIndicator size='large' style={{marginTop: 20}}/></View>)
    }
    return (
      <DayStepProgress progress={this.state.pastStepCount} goal={this.props.goal} />
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
