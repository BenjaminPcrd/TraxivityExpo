import React, { Component } from "react";
import Expo from 'expo'
import { StackNavigator } from 'react-navigation';
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
import { StyleSheet, TouchableOpacity } from 'react-native';
import DayPodometer from './DayPodometer';

class Podometer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Traxivity",
      headerLeft: (
        <Button transparent onPress={() => navigation.getParam('openDrawer')}>
            <Icon name="menu" />
        </Button>
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this.props.navigation.openDrawer() });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Tabs>
          <Tab heading="Day">
            <DayPodometer/>
          </Tab>
          <Tab heading="Week">
            <Text>tab2</Text>
          </Tab>
          <Tab heading="Messages">
            <Text>tab3</Text>
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
