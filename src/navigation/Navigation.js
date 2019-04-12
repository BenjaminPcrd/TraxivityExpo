import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import Podometer from '../screens/Podometer'

const Drawer = createDrawerNavigator({
  Podometer: {
    screen: Podometer
  }
});

export default createAppContainer(Drawer)
