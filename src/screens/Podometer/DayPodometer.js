import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { connect } from 'react-redux';
import DayStepProgress from './DayStepProgress'

class DayPodometer extends React.Component {
  state = {
    pastStepCount: 0,
    pastStepCountLoading: true,
    statsData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    statsDataLoading: true
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe() {
    this._getProgress()
    this._getStatsData()
  };

  async _getProgress() {
    var start = new Date()
    var end = new Date()
    const UTC_OFFSET = start.getTimezoneOffset()/60
    start.setHours(0 - UTC_OFFSET)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setHours(23 - UTC_OFFSET)
    end.setMinutes(59)
    end.setSeconds(59)
    end.setMilliseconds(0)
    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps, pastStepCountLoading: false });
      },
      error => {
        this.setState({ pastStepCount: "Could not get stepCount: " + error });
      }
    );
  }

  async _getStatsData() {
    var data = []
    var start = new Date()
    var end = new Date()
    const UTC_OFFSET = start.getTimezoneOffset()/60
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setMinutes(0)
    end.setSeconds(0)
    end.setMilliseconds(0)
    for(i = 0; i <= 22; i++) {
      start.setHours(i - UTC_OFFSET)
      end.setHours(i+1 - UTC_OFFSET)
      await Pedometer.getStepCountAsync(start, end).then(
        result => {
          data.push(result.steps)
        },
        error => {
          data.push("Could not get stepCount: " + error );
        }
      );
    }
    start.setHours(23 - UTC_OFFSET)
    end.setMinutes(59)
    end.setSeconds(59)
    end.setMilliseconds(999)
    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        data.push(result.steps)
      },
      error => {
        data.push("Could not get stepCount: " + error );
      }
    );
    this.setState({ statsData: data, statsDataLoading: false });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    if(this.state.pastStepCountLoading) {
      return (<View><ActivityIndicator size='large' style={{marginTop: 20}}/></View>)
    }
    return (
      <DayStepProgress progress={this.state.pastStepCount} goal={this.props.goal} statsData={this.state.statsData} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayPodometer)
