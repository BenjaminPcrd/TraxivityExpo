import React from 'react'
import { StyleSheet, View } from "react-native";
import {
  Icon
} from "native-base";
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import * as scale from 'd3-scale'

export default class WeekStepProgress extends React.PureComponent {
  render() {
    const data = Object.values(this.props.pastWeek).map(i => i)
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
    const CUT_OFF = (Math.max(...data) - 1000)
    const Labels = ({  x, y, bandwidth, data }) => (
      data.map((value, index) => (
        <Text
          key={ index }
          x={ value >= CUT_OFF ? x(value) - 50 : x(value) + 5 }
          y={ y(index) + (bandwidth / 2) }
          fontSize={ 14 }
          fill={ value >= CUT_OFF ? 'white' : 'black' }
          alignmentBaseline={ 'middle' }
        >
        {value}
        </Text>
      ))
    )
    return (
      <View style={{ height: 400, padding: 20, flexDirection: 'row' }}>
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(_, index) => days[index]}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <BarChart
            style={{ flex: 1, marginLeft: 8 }}
            data={data}
            horizontal={true}
            yAccessor={({ item }) => item}
            svg={{ fill: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 10, bottom: 10 }}
            spacing={0.2}
            gridMin={0}

          >
            <Grid direction={Grid.Direction.VERTICAL} yMin={1000}/>
            <Labels/>
          </BarChart>
        </View>
      </View>
    )
  }
}

const days = ['Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon']
