import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { ActivityIndicator, View } from "react-native";
import { connect } from 'react-redux';
import DayStepProgress from './DayStepProgress'

class DayPodometer extends React.Component {
  state = {
    pastStepCount: 0,
    statsData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    loading: true
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
    end.setMilliseconds(999)
    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
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
    start.setHours(0 - UTC_OFFSET)
    start.setMinutes(0)
    start.setSeconds(0)
    start.setMilliseconds(0)
    end.setHours(0 - UTC_OFFSET)
    end.setMinutes(59)
    end.setSeconds(59)
    end.setMilliseconds(999)

    for(i = 1; i <= 24; i++) {
      await Pedometer.getStepCountAsync(start, end).then(
        result => {
          data.push(result.steps)
        },
        error => {
          data.push("Could not get stepCount: " + error );
        }
      );
      start.setHours(i - UTC_OFFSET)
      end.setHours(i - UTC_OFFSET)
    }
    this.setState({ statsData: data, loading: false });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  _displayLoading() {
    if(this.state.loading) {
      return (<View><ActivityIndicator size='large' style={{marginTop: 100, podistion: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/></View>)
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <DayStepProgress progress={this.state.pastStepCount} goal={this.props.goal} statsData={this.state.statsData} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(DayPodometer)
