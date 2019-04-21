import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import React from "react";
import Podometer from '../screens/Podometer'
import Settings from '../screens/Settings'
import NewGoal from '../screens/NewGoal'
import SideBar from "../screens/SideBar";

const Drawer = createDrawerNavigator(
  {
    Podometer: {
      screen: Podometer
    },
    NewGoal: {
      screen: NewGoal
    },
    Settings: {
      screen: Settings
    }
  },
  {
    initialRouteName: "Podometer",
    contentComponent: props => <SideBar {...props} />
  }
);

const StackNavigator = createStackNavigator(
  {
    Drawer: {
      screen: Drawer,
    }
  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);

export default createAppContainer(StackNavigator)
