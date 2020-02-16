import React, { useEffect, useState, useCallback } from 'react';
import useInterval from 'use-interval';
import TimeDisplay from './TimeDisplay';
import MinuteSetter from './MinuteSetter';
import ActivitySelect from './ActivitySelect';
import AddActivity from './AddActivity';
import ActivityLog from './ActivityLog';

import { PAUSE, WORK, DEFAULT_WORK, DEFAULT_PAUSE, ONESECONDINMILISECONDS } from './constants';

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK);
  const [pauseTime, setPauseTime] = useState(DEFAULT_PAUSE);
  const [activities, setActivities] = useState([]);
  const [timerRunning, setTimerRunning] = useState(false);
  const [log, setLog] = useState({ runner: 1, activities: [] });
  const [timer, setTimer] = useState(DEFAULT_WORK * 60);
  const [mode, setMode] = useState(WORK);

  const [activity, setActivity] = useState({
    id: 0,
    name: 'Updating...',
  });

  const changeTime = e => {
    const id = e.target.getAttribute('id');
    let newTime;
    let callFunc;
    if (id.indexOf('session') !== -1) {
      newTime = workTime;
      callFunc = setWorkTime;
    } else {
      newTime = pauseTime;
      callFunc = setPauseTime;
    }
    newTime = id.indexOf('increment') !== -1 ? newTime + 1 : newTime - 1;
    if (newTime > 0 && newTime <= 60) {
      callFunc(newTime);
    }
  };

  const resetTimer = () => {
    setWorkTime(DEFAULT_WORK);
    setPauseTime(DEFAULT_PAUSE);
    setTimer(DEFAULT_WORK * 60);
    setTimerRunning(false);
  };

  const changeCurrentActivity = e => {
    const id = parseInt(e.target.value, 10);
    const { name } = activities.filter(obj => obj.id === id)[0];

    setActivity({ id, name });
  };

  const addActivity = newActivity => {
    const newId = Math.max(...activities.map(obj => obj.id)) + 1;
    setActivities([...activities, { id: newId, name: newActivity }]);
  };

  const logActivity = (id, timeSpent) => {
    setLog({
      runner: log.runner + 1,
      activities: [...log.activities, { key: log.runner, id, timeSpent }],
    });
  };


  useInterval(
    () => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setMode(mode === WORK ? PAUSE : WORK);
        setTimer(mode === WORK ? pauseTime : workTime);
      }
    },
    timerRunning ? ONESECONDINMILISECONDS : null
  );

  const toggleTimer = () => {
    if (timerRunning) {
      logActivity(activity.id, workTime * 60 - timer);
    }
    setTimerRunning(!timerRunning);
  };

  useEffect(() => {
    setActivities([
      {
        id: 1,
        name: 'French',
      },
      {
        id: 2,
        name: 'Spanish',
      },
      {
        id: 3,
        name: 'Javascript',
      },
      {
        id: 4,
        name: 'Typescript',
      },
    ]);
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      setActivity({ id: 1, name: activities.filter(obj => obj.id === 1)[0].name });
    }
  }, [activities]);

  return (
    <div id="pomodoro">
      <h1>Pomodoro</h1>
      <h3 id="timer-label">
        {mode === WORK && <>
          You are learning: {activity.name}</>}
        {mode === PAUSE && <>Pausing...</>}
      </h3>
      <TimeDisplay seconds={timer} id="time-left" />
      <div className="timerControls">
        <MinuteSetter
          minutes={workTime}
          onChange={changeTime}
          ids={{
            display: 'session-length',
            plus: 'session-increment',
            minus: 'session-decrement',
          }}
          title={<div id="session-label">Set work time:</div>}
        />

        <MinuteSetter
          minutes={pauseTime}
          onChange={changeTime}
          controlFor="PAUSE"
          ids={{
            display: 'break-length',
            plus: 'break-increment',
            minus: 'break-decrement',
          }}
          title={<div id="break-label">Break time:</div>}
        />
        <button type="button" onClick={toggleTimer} id="start_stop">
          {timerRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" onClick={resetTimer} id="reset">
          Reset
        </button>
      </div>
      <div className="activityControls">
        Add activity:
        <AddActivity onChange={addActivity} />
        Select activity:
        <ActivitySelect activities={activities} onChange={changeCurrentActivity} />
      </div>
      <ActivityLog log={log} />
    </div>
  );
};

export default Pomodoro;
