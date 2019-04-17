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

export default class DateTimePickerTester extends Component {
  state = {
    isTimePickerStartVisible: false,
    isTimePickerEndVisible: false,
  };

  _showTimePickerStart = () => this.setState({ isTimePickerStartVisible: true });
  _hideTimePickerStart = () => this.setState({ isTimePickerStartVisible: false });
  _showTimePickerEnd = () => this.setState({ isTimePickerEndVisible: true });
  _hideTimePickerEnd = () => this.setState({ isTimePickerEndVisible: false });

  _handlePickedStart = (date) => {
    console.log('Start Time: ', date.getHours() + "h");
    this._hideTimePickerStart();
  };

  _handlePickedEnd = (date) => {
    console.log('End Time: ', date.getHours() + "h");
    this._hideTimePickerEnd();
  };

  render () {
    return (
      <Container style={styles.container}>
        <Text>
          Select time below for the start and end of your day for sending you messages. Messages will not be sent outside of these hours.
        </Text>
        <Button full onPress={this._showTimePickerStart}>
          <Icon name="clock" />
          <Text>Start of day</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isTimePickerStartVisible}
          onConfirm={this._handlePickedStart}
          onCancel={this._hideTimePickerStart}
          mode='time'
          is24Hour={false}
        />

        <Button full onPress={this._showTimePickerEnd}>
          <Icon name="clock" />
          <Text>End of day</Text>
        </Button>
        <DateTimePicker
          isVisible={this.state.isTimePickerEndVisible}
          onConfirm={this._handlePickedEnd}
          onCancel={this._hideTimePickerEnd}
          mode='time'
          is24Hour={false}
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
