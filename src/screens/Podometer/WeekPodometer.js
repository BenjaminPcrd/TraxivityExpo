import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from "react-native";
import WeekStepProgress from './WeekStepProgress'

export default class DayPodometer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      pastStepCount: {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
      }
    };
    this._preState = this.state.pastStepCount
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  async _subscribe() {
    const today = new Date()
    var nbDays = today.getDay();
    if(nbDays == 0) nbDays = 7
    const UTC_OFFSET = today.getTimezoneOffset()/60

    var start = new Date()
    var end = new Date()
    start.setHours(0 - UTC_OFFSET)
    start.setMinutes(0)
    end.setHours(23 - UTC_OFFSET)
    end.setMinutes(59)

    for(i = 0; i < nbDays; i++) {
      await this._getStepCount(start, end)
      start.setDate(start.getDate() - 1)
      end.setDate(end.getDate() - 1)
    }
    this.setState({ pastStepCount: this._preState, loading: false });
  };


  async _getStepCount(start, end) {
    var day = days[start.getDay()]
    await Pedometer.getStepCountAsync(start, end).then(
      result => {
        this._preState = {...this._preState, [day]: result.steps}
      },
      error => {
        this._preState = {...this._preState, [day]: "error: " + error}
      }
    );
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    if(this.state.loading) {
      return (<View><ActivityIndicator size='large' style={{marginTop: 20}}/></View>)
    }
    return (
      <WeekStepProgress pastWeek={this.state.pastStepCount}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
