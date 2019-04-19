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
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Please set your goal below
        </Text>
        <ScrollPicker
          dataSource={stepsTab}
          selectedIndex={stepsTab.indexOf((this.props.goal).toString())}
          renderItem={(data, index, isSelected) => {
              //
          }}
          onValueChange={(data, selectedIndex) => {
              //
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
        <Button onPress={console.log("button")}>
          <Text>OK</Text>
        </Button>
      </View>
    );
  }
}

var stepsTab = [];
for (var i = 3000; i <= 50000; i = i + 500) {
     stepsTab.push(i.toString());
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
    goal: state.setNewGoal.goal
  }
}

export default connect(mapStateToProps)(SetNewGoal)
