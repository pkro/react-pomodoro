import React, { useEffect, useState, useCallback } from 'react';
import useInterval from './useInterval';
import TimerDisplay from './TimerDisplay';
import MinuteSetter from './MinuteSetter';
import ActivitySelect from './ActivitySelect';
import AddActivity from './AddActivity';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [workTime, setWorkTime] = useState(25);
  const [pauseTime, setPauseTime] = useState(5);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState(1);
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

  const changeCurrentActivity = e => {
    const currentActivity = e.target.value;
    setActivity(currentActivity);
  };

  const addActivity = newActivity => {
    const newId = Math.max(...activities.map(obj => obj.id)) + 1;
    setActivities([...activities, { id: newId, activity: newActivity }]);
  };

  useEffect(() => {
    setActivities([
      {
        id: 1,
        activity: 'French',
      },
      {
        id: 2,
        activity: 'Spanish',
      },
      {
        id: 3,
        activity: 'Javascript',
      },
      {
        id: 4,
        activity: 'Typescript',
      },
    ]);
  }, []);

  useInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, 1000);
  const currentActivity = activities.filter(obj => obj.id === activity)[0];
  return (
    <div>
      <h1>Pomodoro</h1>
      <h3>
        You are learning:
        {currentActivity ? currentActivity.activity : 'please wait'}
      </h3>
      <TimerDisplay timeLeft={timeLeft} />
      <div className="timerControls">
        Set work time:
        <MinuteSetter minutes={workTime} onChange={changeWorkTime} />
        Set pause time:
        <MinuteSetter minutes={pauseTime} onChange={changePauseTime} />
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
