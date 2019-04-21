import React from 'react'
import { StyleSheet, View } from "react-native";
import {
  Icon,
  Text
} from "native-base";
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'

export default class WeekStepProgress extends React.PureComponent {
  render() {
    const data = Object.values(this.props.pastWeek).map(i => i)
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    return (
      <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1 }}
            data={data.reverse()}
            contentInset={verticalContentInset}
            svg={{ fill: 'rgb(134, 65, 244)' }}
          >
            <Grid/>
          </BarChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight, marginTop: 5 }}
            data={data}
            formatLabel={(value, index) => days[index]}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    )
  }
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
