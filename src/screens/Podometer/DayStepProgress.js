import React from 'react'
import { StyleSheet, View } from "react-native";
import {
  Icon,
  Text
} from "native-base";
import { ProgressCircle } from 'react-native-svg-charts'

export default class DayStepProgress extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ProgressCircle
          style={styles.circle}
          progress={ this.props.progress/this.props.goal }
          progressColor={'rgb(134, 65, 244)'}
        >
          <View style={styles.textContainer}>
            <Text>{this.props.progress} steps</Text>
            <Text>{((this.props.progress/this.props.goal) * 100).toFixed(0)}% of goal</Text>
          </View>
        </ProgressCircle>
        <View style={styles.textContainer}>
          <Text dark>Your daily goal:</Text>
          <Text>{this.props.goal} steps</Text>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  circle: {
    height: 200,
    marginTop: 20
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
