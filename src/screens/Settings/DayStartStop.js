import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Icon
} from "native-base";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux'


class DayStartStop extends Component {
  state = {
    isTimePickerStartVisible: false,
    isTimePickerEndVisible: false,
  };

  _showTimePickerStart = () => this.setState({ isTimePickerStartVisible: true });
  _hideTimePickerStart = () => this.setState({ isTimePickerStartVisible: false });
  _showTimePickerEnd = () => this.setState({ isTimePickerEndVisible: true });
  _hideTimePickerEnd = () => this.setState({ isTimePickerEndVisible: false });

  _handlePickedStart = (date) => {
    console.log('Start Time: ', date.getHours());
    const action = { type: "SET_START_DAY_TIME", value: date.getHours() }
    this.props.dispatch(action)
    this._hideTimePickerStart();
  };

  _handlePickedEnd = (date) => {
    console.log('End Time: ', date.getHours());
    const action = { type: "SET_END_DAY_TIME", value: date.getHours() }
    this.props.dispatch(action)
    this._hideTimePickerEnd();
  };

  render () {
    return (
      <Container style={styles.container}>
        <Text>
          Select time below for the start and end of your day for sending you messages. Messages will not be sent outside of these hours.
        </Text>
        <Button full onPress={this._showTimePickerStart}>
          <Icon name="time" />
          <Text>Start of day: {this.props.startDayTime}h</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isTimePickerStartVisible}
          onConfirm={this._handlePickedStart}
          onCancel={this._hideTimePickerStart}
          mode='time'
          is24Hour={false}
          date={new Date('December 17, 1995 ' + this.props.startDayTime + ':00:00')}
        />

        <Button full onPress={this._showTimePickerEnd}>
          <Icon name="time" />
          <Text>End of day: {this.props.endDayTime}h</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isTimePickerEndVisible}
          onConfirm={this._handlePickedEnd}
          onCancel={this._hideTimePickerEnd}
          mode='time'
          is24Hour={false}
          date={new Date('December 17, 1995 ' + this.props.endDayTime + ':00:00')}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingLeft: 30,
    paddingRight: 30
  }
});

const mapStateToProps = (state) => {
  return {
    startDayTime: state.setStartEndDayTime.startDayTime,
    endDayTime: state.setStartEndDayTime.endDayTime
  }
}

export default connect(mapStateToProps)(DayStartStop)
