import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Podometer from '../screens/Podometer'
import { Text } from 'react-native';

const StackNavigator = createStackNavigator({
  Traxivity: {
    screen: Podometer,
  }
});

const Drawer = createDrawerNavigator(
  {
    Podometer: {
      screen: StackNavigator
    }
  }
);



export default createAppContainer(Drawer)
