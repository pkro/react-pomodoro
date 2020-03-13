export const LOG_SESSION = 'LOG_SESSION';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';

export type LOG_SESSION = typeof LOG_SESSION;
export type ADD_ACTIVITY = typeof ADD_ACTIVITY;

export type Activity = {
  id: number;
  timeSpent: number;
};

export type State = {
  log: Activity[];
};

// action creator(s)
export function addSession(id: number, timeSpent: number) {
  return {
    type: LOG_SESSION,
    payload: { id, timeSpent },
  };
}

export function addActivity(activity: string) {
  return {
    type: ADD_ACTIVITY,
    payload: activity,
  };
}

// very simple state shape
const initialState = {
  log: [],
};

// reducer
function pomodoroApp(state = initialState, action: any) {
  switch (action.type) {
    case LOG_SESSION:
      return { ...state, log: [...state.log, action.payload] };
    default:
      return state;
  }
}
