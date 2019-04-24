import React from 'react'
import { StyleSheet, View, Text } from "react-native";
import { Text as TextSvg } from 'react-native-svg'
import { ProgressCircle, Grid, LineChart, BarChart, XAxis, YAxis } from 'react-native-svg-charts'

export default class DayStepProgress extends React.PureComponent {
  render() {
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
      <View style={styles.mainContainer}>
        <View style={styles.circleContainer}>
          <ProgressCircle
            style={{flex: 1, marginTop: 20, marginBottom: 10}}
            progress={ this.props.progress/this.props.goal }
            progressColor={'rgb(134, 65, 244)'}
          >
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20}}>{this.props.progress} steps</Text>
              <Text style={{fontSize: 15}}>{((this.props.progress/this.props.goal) * 100).toFixed(0)}% of goal</Text>
            </View>
          </ProgressCircle>
        </View>

        <View style={styles.textContainer}>
          <Text style={{fontSize: 20}}>Your daily goal:</Text>
          <Text style={{fontSize: 15}}>{this.props.goal} steps</Text>
        </View>

        <View style={styles.barChartContainer}>
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
              <Labels/>
            </BarChart>
            <XAxis
              style={{ marginHorizontal: -10, height: xAxisHeight }}
              data={this.props.statsData}
              formatLabel={(value, index) => index == 0 || index == 4 || index == 8 || index == 12 || index == 16 || index == 20 ? index : ""}
              contentInset={{ left: 23, right: 15 }}
              svg={axesSvg}
            />
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  circleContainer: {
    flex: 5
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barChartContainer: {
    flex: 5,
    flexDirection: 'row',
    margin: 15
  }
});
