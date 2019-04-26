import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Content,
  Text
} from "native-base";
import { StyleSheet, StatusBar } from 'react-native';
import SetNewGoal from './SetNewGoal'

export default class NewGoal extends Component {
  render() {
    console.log(this.props)
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
             <Title>Set a new goal</Title>
          </Body>
        </Header>
        <SetNewGoal navigation={this.props.navigation}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  }
});
