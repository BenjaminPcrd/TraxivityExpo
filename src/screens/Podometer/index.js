import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Tabs,
  Tab,
  Text
} from "native-base";
import { StyleSheet, StatusBar } from 'react-native';
import DayPodometer from './DayPodometer';

export default class Podometer extends Component {
  /*static navigationOptions = ({ navigation }) => {
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
    };*/

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="ios-menu" />
            </Button>
          </Left>
          <Body>
             <Title>Podometer</Title>
          </Body>
        </Header>
        <Tabs>
          <Tab heading="Day">
            <DayPodometer/>
          </Tab>
          <Tab heading="Week">
          <Text>Week tab</Text>
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
    marginTop: StatusBar.currentHeight
  }
});
