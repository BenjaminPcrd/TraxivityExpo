import { createStore, combineReducers } from 'redux';
import setStartEndDayTime from './reducers/settingsReducer';
import setNewGoal from './reducers/goalReducer'

const reducers = combineReducers({
  setStartEndDayTime,
  setNewGoal
})
const store = createStore(reducers)
console.log(store.getState())
export default store
