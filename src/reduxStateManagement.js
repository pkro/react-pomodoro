import { dispatch } from 'react-redux';
export const LOG_SESSION = 'LOG_SESSION';

// action creator(s)
export function addSession(id, timeSpent) {
  return {
    type: LOG_SESSION,
    payload: { id, timeSpent },
  };
}

// automatically dispatch
export const boundAddSession = (id, timeSpent) => dispatch(addSession(id, timeSpent));

// very simple state shape
const initialState = {
  log: [],
};

// reducer
function pomodoroApp(state = initialState, action) {
  switch (action.type) {
    case LOG_SESSION:
      return { ...state, log: [...state.log, action.payload] };
    default:
      return state;
  }
}
