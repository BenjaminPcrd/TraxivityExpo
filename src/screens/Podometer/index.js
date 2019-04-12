import React, { Component } from "react";
import Expo from 'expo'
import { StackNavigator } from 'react-navigation';
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Title,
  Tab,
  Tabs
} from "native-base";
import { StyleSheet } from 'react-native';
import DayPodometer from './DayPodometer';

class Podometer extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" />
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
    marginTop: 30
  }
});

export default Podometer
