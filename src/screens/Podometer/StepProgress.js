import React from 'react'
import { StyleSheet, Text, View } from "react-native";
import { ProgressCircle } from 'react-native-svg-charts'

export default class StepProgress extends React.PureComponent {
  render() {
    console.log(this.props)
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
    alignItems: 'center'
  }
});
