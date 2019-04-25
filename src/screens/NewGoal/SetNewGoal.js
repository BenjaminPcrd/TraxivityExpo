import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ScrollPicker from 'react-native-wheel-scroll-picker';
import {
  Button,
  Icon,
  Text
} from "native-base";
import { connect } from 'react-redux'

class SetNewGoal extends Component {

  constructor(props) {
    super(props)
    this._value = this.props.goal
  }

  _confirmButton() {
    const action = { type: "SET_NEW_GOAL", value: this._value }
    this.props.dispatch(action)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 20}}>Week's goal: {this.props.goal} steps per day.</Text>
          <Text style={{fontSize: 15}}>Please set your new goal below</Text>
        </View>
        <View style={styles.scrollContainer}>
          <ScrollPicker
            dataSource={stepsTab}
            selectedIndex={stepsTab.indexOf((this.props.goal).toString())}
            renderItem={(data, index, isSelected) => {
                //
            }}
            onValueChange={(data, selectedIndex) => {
              this._value = data
            }}
            wrapperHeight={180}
            wrapperWidth={150}
            wrapperBackground={'#FFFFFF'}
            itemHeight={60}
            highlightColor={'#d8d8d8'}
            highlightBorderWidth={2}
            activeItemColor={'#222121'}
            itemColor={'#B4B4B4'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => this._confirmButton()} style={{ alignSelf: 'center'}}><Text>Confirm</Text></Button>
        </View>
      </View>
    );
  }
}

var stepsTab = [];
for (var i = 3000; i <= 50000; i = i + 500) {
     stepsTab.push(i.toString());
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  scrollContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(SetNewGoal)
