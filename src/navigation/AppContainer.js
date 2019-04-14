import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Podometer from '../screens/Podometer'
import Settings from '../screens/Settings'
import { Text } from 'react-native';

const Drawer = createDrawerNavigator(
  {
    Podometer: {
      screen: Podometer
    },
    Settings: {
      screen: Settings
    }
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
