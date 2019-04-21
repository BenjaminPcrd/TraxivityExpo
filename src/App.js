import React from 'react';
import AppContainer from './navigation/AppContainer';
import { Provider } from 'react-redux'
import Store from './store/configureStore'

import { Root } from "native-base";

export default class App extends React.Component {
  render() {
    return(
      <Provider store={Store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}
