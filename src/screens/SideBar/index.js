import React, { Component } from "react";
import { Image, StatusBar } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
} from "native-base";

const datas = [
  {
    name: "Podometer",
    route: "Podometer",
    icon: "walk",
  },
  {
    name: "New Goal",
    route: "NewGoal",
    icon: "create",
  },
  {
    name: "Settings",
    route: "Settings",
    icon: "ios-settings",
  },
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    };
  }

  render() {
    return (
      <Container>
        <Content bounces={true} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
        <Image
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
            }}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              position: "absolute",
              marginTop: StatusBar.currentHeight
            }}
          />
          <Image
            square
            style={{
              height: 80,
              width: 70,
              position: "absolute",
              alignSelf: "center",
              top: 20,
              marginTop: StatusBar.currentHeight
            }}
            source={{
              uri:
                "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png"
            }}
          />
          <List dataArray={datas} contentContainerStyle={{ marginTop: 120 + StatusBar.currentHeight }} renderRow=
            {
              data =>
              <ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)} >
                <Left>
                  <Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }}/>
                  <Text> {data.name} </Text>
                </Left>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar;
