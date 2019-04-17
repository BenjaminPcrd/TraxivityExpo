import React from 'react';
import AppContainer from './navigation/AppContainer';
import { Provider } from 'react-redux'
import Store from './store/configureStore'

export default class App extends React.Component {
  render() {
    return(
      <Provider store={Store}>
        <AppContainer />
      </Provider>
    );
  }
}
