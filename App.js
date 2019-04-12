import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import { Font } from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }
  render() {
    if(!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Navigation />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
