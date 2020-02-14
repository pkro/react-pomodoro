import React, { useEffect, useState, useCallback } from 'react';
import useInterval from 'use-interval';
import TimeDisplay from './TimeDisplay';
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
  const [timerRunning, setTimerRunning] = useState(false);
  const [log, setLog] = useState({ runner: 1, activities: [] });
  const [activity, setActivity] = useState({
    id: 0,
    name: 'Updating...',
  });

  const changeWorkTime = e => {
    const minutes = parseInt(e.target.value, 10);
    setWorkTime(minutes);
    setTimer({ mode: WORK, secondsLeft: minutes * 60 });
  };

  const changePauseTime = e => {
    const minutes = parseInt(e.target.value, 10);
    setPauseTime(minutes);
    setTimer({ mode: PAUSE, secondsLeft: minutes * 60 });
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
      if (timer.secondsLeft > 0) {
        setTimer({ secondsLeft: timer.secondsLeft - 1 });
      }
    },
    timerRunning ? 1000 : null
  );

  const toggleTimer = () => {
    if (timerRunning) {
      logActivity(activity.id, workTime * 60 - timer.secondsLeft);
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
    <div>
      <h1>Pomodoro</h1>
      <h3>
        You are learning:
        {activity.name}
      </h3>
      <TimeDisplay seconds={timer.secondsLeft} />
      <div className="timerControls">
        Set work time:
        <MinuteSetter minutes={workTime} onChange={changeWorkTime} />
        Set pause time:
        <MinuteSetter minutes={pauseTime} onChange={changePauseTime} />
        <ToggleButton onClick={toggleTimer} buttonText={timerRunning ? 'Pause' : 'Start'} />
      </div>
      <div className="activityControls">
        Add activity:
        <AddActivity onChange={addActivity} />
        Select activity:
        <ActivitySelect activities={activities} onChange={changeCurrentActivity} />
      </div>
      <div className="log">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Time spent</td>
            </tr>
          </thead>
          <tbody>
            {log.activities.map(obj => {
              return (
                <tr key={obj.key}>
                  <td>{obj.id}</td>
                  <td>
                    <TimeDisplay seconds={obj.timeSpent} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pomodoro;
