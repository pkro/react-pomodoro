import React, { useState } from 'react';
import useInterval from 'use-interval';
import TimeDisplay, { seconds2display } from './TimeDisplay';
import MinuteSetter from './MinuteSetter';
import ActivityControls from './Activitys/ActivityPanel';

import { PAUSE, WORK, DEFAULT_WORK, DEFAULT_PAUSE, ONESECONDINMILISECONDS } from './constants';

const Pomodoro = () => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK);
  const [pauseTime, setPauseTime] = useState(DEFAULT_PAUSE);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timer, setTimer] = useState(DEFAULT_WORK * 60);
  const [mode, setMode] = useState(WORK);
  const [logNotifier, setLogNotifier] = useState({ notification: true, timeSpent: 0 });

  let playPromise;

  const changeTime = e => {
    const id = e.target.getAttribute('id');
    const isWorkSession = id.indexOf('session') !== -1;
    const isIncrement = id.indexOf('increment') !== -1;

    let newTime = isWorkSession ? workTime : pauseTime;
    const callFunc = isWorkSession ? setWorkTime : setPauseTime;

    newTime = isIncrement ? newTime + 1 : newTime - 1;
    if (newTime > 0 && newTime <= 60) {
      callFunc(newTime);
    }
    setTimer(newTime * 60);
  };

  const resetTimer = () => {
    setWorkTime(DEFAULT_WORK);
    setPauseTime(DEFAULT_PAUSE);
    setTimer(DEFAULT_WORK * 60);
    setTimerRunning(false);
    const beep = document.getElementById('beep');
    if (playPromise !== undefined) {
      playPromise.then(() => {
        beep.pause();
        beep.currentTime = 0;
        beep.src = '';
      });
    }

  };

  useInterval(
    () => {
      if (timer > 0) {
        setTimer(timer - 1);
        document.title = `${mode === WORK ? 'Work' : 'Pause'} ${seconds2display(timer)}`;
      } else if (mode === WORK) {
        const beep = document.getElementById('beep');
        beep.src = 'pausecompleted.wav';
        playPromise = beep.play();
        setLogNotifier({ notification: !logNotifier.notification, timeSpent: workTime * 60 - timer });
        setTimer(pauseTime * 60);
        setTimerRunning(true);
        setMode(PAUSE);
      } else {
        const beep = document.getElementById('beep');
        beep.src = 'completed.wav';
        playPromise = beep.play();
        setTimer(workTime * 60);
        setTimerRunning(true);
        setMode(WORK);
      }
    },
    timerRunning ? ONESECONDINMILISECONDS : null
  );

  const toggleTimer = () => {
    setTimerRunning(!timerRunning);
  };

  return (
    <div id="pomodoro">
      <div id="head">
        <h1>Pomodoro</h1>
        <button type="button" onClick={resetTimer} id="reset">
          Reset
          </button>
      </div>

      <h4 id="timer-label">
        {mode === WORK && timerRunning && 'Working!'}
        {mode === PAUSE && timerRunning && 'Break time'}
        {!timerRunning && 'Press start'}
      </h4>
      <div id="timerHolder">
        <TimeDisplay seconds={timer} id="time-left" />
      </div>
      <div className="timerControls">
        <MinuteSetter
          minutes={workTime}
          onChange={changeTime}
          ids={{
            display: 'session-length',
            plus: 'session-increment',
            minus: 'session-decrement',
          }}
          title={<div id="session-label">Work time</div>}
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
          title={<div id="break-label">Break time</div>}
        />
      </div>
      <button type="button" onClick={toggleTimer} id="start_stop">
        {timerRunning ? 'Pause' : 'Start'}
      </button>

      <ActivityControls logNotifier={logNotifier} />

      <audio src="completed.wav" id="beep" preload="none" />
    </div>
  );
};

export default Pomodoro;
