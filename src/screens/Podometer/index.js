import React, { Component } from "react";
import Expo from 'expo'
import { StackNavigator, NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Text,
  Title,
  Tab,
  Tabs,
  Button
} from "native-base";
import { StyleSheet } from 'react-native';
import DayPodometer from './DayPodometer';

class Podometer extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: "Traxivity",
        headerLeft: (
          <Button transparent onPress={navigation.getParam('openDrawer')}>
            <Icon name="menu" />
          </Button>
        ),
      };
    };

    componentDidMount() {
      this.props.navigation.setParams({ openDrawer: this._openDrawer });
    }

    _openDrawer = () => {
      this.props.navigation.openDrawer()
    };

  render() {
    return (
      <Container style={styles.container}>
        <Tabs>
          <Tab heading="Day">
            <DayPodometer/>
          </Tab>
          <Tab heading="Week">
          <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Text>Week tab</Text>
          </Button>
          </Tab>
          <Tab heading="Messages">
            <Text>Messages tab</Text>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  }
});

export default Podometer
