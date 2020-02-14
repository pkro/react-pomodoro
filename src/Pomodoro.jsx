import React, { useEffect, useState, useCallback } from 'react';
import useInterval from './useInterval';
import TimerDisplay from './TimerDisplay';
import MinuteSetter from './MinuteSetter';
import ActivitySelect from './ActivitySelect';
import AddActivity from './AddActivity';
import ToggleButton from './ToggleButton';

import { PAUSE, WORK } from './constants';

const Pomodoro = () => {
  const [timer, setTimer] = useState({
    secondsLeft: 25 * 60,
    mode: WORK,
  });
  const [workTime, setWorkTime] = useState(25);
  const [pauseTime, setPauseTime] = useState(5);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({
    id: 0,
    name: 'Updating...',
  });
  const [delay, setDelay] = useState(1000);

  const changeWorkTime = e => {
    const minutes = e.target.value;
    setWorkTime(parseInt(minutes, 10));
    setTimer({ secondsLeft: minutes * 60 });
  };

  const changePauseTime = e => {
    const minutes = e.target.value;
    setPauseTime(parseInt(minutes, 10));
    setTimer({ secondsLeft: minutes * 60 });
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

  const toggleTimerMode = () => {
    // useInterval(null, null);

    setTimer({
      secondsLeft: timer.mode === WORK ? workTime : pauseTime,
      mode: timer.mode === WORK ? PAUSE : WORK,
    });
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
    setActivity({ id: 1, name: 'French' });
  }, []);

  /* Why doesnt this work?
  useEffect(() => {
    setActivity({ id: 1, name: activities.filter(obj => obj.id === 1)[0].name });
  }, [activities]); */

  useInterval(() => {
    if (timer.secondsLeft > 0) {
      setTimer({ secondsLeft: timer.secondsLeft - 1 });
    } else {
      setDelay(null);
    }
  }, delay);
  /*
    useEffect(() => {
      setActivity({ id: activity.id, name: activity.name })
    }, []);
  */

  return (
    <div>
      <h1>Pomodoro</h1>
      <h3>
        You are learning:
        {activity.name}
      </h3>
      <TimerDisplay timeLeft={timer.secondsLeft} />
      <div className="timerControls">
        Set work time:
        <MinuteSetter minutes={workTime} onChange={changeWorkTime} />
        Set pause time:
        <MinuteSetter minutes={pauseTime} onChange={changePauseTime} />
        <ToggleButton
          onClick={toggleTimerMode}
          buttonText={timer.mode === WORK ? 'Pause' : 'Start'}
        />
      </div>
      <div className="activityControls">
        Add activity:
        <AddActivity onChange={addActivity} />
        Select activity:
        <ActivitySelect activities={activities} onChange={changeCurrentActivity} />
      </div>
    </div>
  );
};

export default Pomodoro;
