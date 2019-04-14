import React from 'react';
import { Font } from "expo";
import App from '../App';

export default class Setup extends React.Component {
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
      <App />
    );
  }
}
