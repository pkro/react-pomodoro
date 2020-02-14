import React from 'react';
import { useEffect, useState, useCallback } from 'react';

import { seconds2display } from './utils';
import useInterval from './useInterval';
import TimerDisplay from './TimerDisplay';
import MinuteSetter from './MinuteSetter';


const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [workTime, setWorkTime] = useState(25);
  const [pauseTime, setPauseTime] = useState(5);
  /* 
    const changeWorkTime = useCallback(() => {
      setWorkTime(minutes);
    }, [minutes]);
   */
  const changeWorkTime = e => {
    const minutes = e.target.value;
    setWorkTime(parseInt(minutes, 10));
    setTimeLeft(minutes * 60);
  };

  const changePauseTime = e => {
    const minutes = e.target.value;
    setPauseTime(parseInt(minutes, 10));
    setTimeLeft(minutes * 60);
  };

  useInterval(() => {
    setTimeLeft(timeLeft - 60);
  }, 1000);

  return (
    <div>
      Pomodoro
      <TimerDisplay timeLeft={timeLeft} />
      <MinuteSetter minutes={workTime} onChange={changeWorkTime} />
      <MinuteSetter minutes={pauseTime} onChange={changePauseTime} />
    </div>
  );
};

export default Pomodoro;
