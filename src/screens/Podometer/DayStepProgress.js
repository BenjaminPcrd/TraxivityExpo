import React from 'react'
import { StyleSheet, View, Text } from "react-native";
import { Text as TextSvg } from 'react-native-svg'
import { ProgressCircle, Grid, LineChart, BarChart, XAxis, YAxis } from 'react-native-svg-charts'

export default class DayStepProgress extends React.PureComponent {
  render() {
    console.log(this.props)
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const Labels = ({ x, y, bandwidth, data }) => (
     data.map((value, index) => (
      <TextSvg
        key={ index }
        x={ x(index) + (bandwidth / 2) }
        y={ y(value) - 5 }
        fontSize={ 5 }
        fill={ 'grey' }
        alignmentBaseline={ 'middle' }
        textAnchor={ 'middle' }
      >
        {value}
      </TextSvg>
     ))
    )
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
        <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
          <YAxis
            data={this.props.statsData}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1, marginLeft: 8 }}
              data={this.props.statsData}
              horizontal={false}
              yAccessor={({ item }) => item}
              svg={{ fill: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 10, bottom: 10 }}
              spacing={0.2}
              gridMin={0}
            >
              <Grid direction={Grid.Direction.HORIZONTAL}/>
              <Labels/>
            </BarChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={this.props.statsData}
              formatLabel={(value, index) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={axesSvg}
            />
          </View>
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
