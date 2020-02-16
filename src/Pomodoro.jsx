import React, { useState } from 'react';
import useInterval from 'use-interval';
import TimeDisplay from './TimeDisplay';
import MinuteSetter from './MinuteSetter';
import ActivityControls from './Activitys/ActivityControls';

import { PAUSE, WORK, DEFAULT_WORK, DEFAULT_PAUSE, ONESECONDINMILISECONDS } from './constants';

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK);
  const [pauseTime, setPauseTime] = useState(DEFAULT_PAUSE);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(DEFAULT_WORK * 60);
  const [mode, setMode] = useState(WORK);
  const [workTimeNotify, setWorkTimeNotify] = useState(0);

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
      setWorkTimeNotify(workTime * 60 - timer);
    }
    setTimerRunning(!timerRunning);
  };

  return (
    <div id="pomodoro">
      <h1>Pomodoro</h1>
      <h3 id="timer-label">
        {mode === WORK && <>Working!</>}
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
      </div>
      <button type="button" onClick={toggleTimer} id="start_stop">
        {timerRunning ? 'Pause' : 'Start'}
      </button>
      <button type="button" onClick={resetTimer} id="reset">
        Reset
        </button>
      <ActivityControls workTimeNotify={workTimeNotify} />
    </div>


  );
};

export default Pomodoro;
