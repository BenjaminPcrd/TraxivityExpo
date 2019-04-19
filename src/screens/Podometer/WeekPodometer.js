import Expo from "expo";
import React from "react";
import { Pedometer } from "expo";
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from "react-native";

export default class DayPodometer extends React.Component {
  state = {
    isLoading: true,
    isPedometerAvailable: "checking",
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

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    /*Pedometer.isAvailableAsync().then(
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
    );*/

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
      this._getStepCount(start, end)
      start.setDate(start.getDate() - 1)
      end.setDate(end.getDate() - 1)
    }
    this.setState({
      isLoading: false
    })

  };

  _getStepCount(start, end) {
    var day = days[start.getDay()]
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: { ...this.state.pastStepCount, [day]: result.steps} });
        //console.log(result.steps)
      },
      error => {
        this.setState({ pastStepCount: { ...this.state.pastStepCount, [day]: "error: " + error} });
        //console.log("Could not get stepCount: " + error)
      }
    );
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  _displayLoading() {
    if(this.state.isLoading) {
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

/*<FlatList
  data={this.state.pastStepCount.monday}
  keyExtractor={(item) => Math.floor(Math.random() * Math.floor(999999)).toString()}
  renderItem={({item}) => <Text>{item}</Text>}
/>*/
  render() {
    //console.log(this.state)
    return (
      <View style={styles.container}>
        <Text>Monday    {this.state.pastStepCount.monday}</Text>
        <Text>Tuesday   {this.state.pastStepCount.tuesday}</Text>
        <Text>Wednesday {this.state.pastStepCount.wednesday}</Text>
        <Text>Thursday  {this.state.pastStepCount.thursday}</Text>
        <Text>Friday    {this.state.pastStepCount.friday}</Text>
        <Text>Saturday  {this.state.pastStepCount.saturday}</Text>
        <Text>Sunday    {this.state.pastStepCount.sunday}</Text>
        {this._displayLoading()}
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
