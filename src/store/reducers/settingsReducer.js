
const initialState = {
  startDayTime: 8,
  endDayTime: 22
}

function setStartEndDayTime(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_START_DAY_TIME':
      nextState = {
        ...state,
        startDayTime: action.value
      }
      return nextState || state
    case 'SET_END_DAY_TIME':
      nextState = {
        ...state,
        endDayTime: action.value
      }
      return nextState || state
    default:
      return state
  }
}

export default setStartEndDayTime
