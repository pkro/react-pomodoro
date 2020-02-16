import React, { useEffect, useState } from 'react';
import ActivityLog from './ActivityLog';
import ActivitySelect from './ActivitySelect';
import AddActivity from './AddActivity';

export default function ActivityControls({ workTimeNotify }) {
  const [log, setLog] = useState({ runner: 1, activities: [] });
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState({
    id: 0,
    name: 'Updating...',
  });

  const changeCurrentActivity = e => {
    const id = parseInt(e.target.value, 10);
    const { name } = activities.filter(obj => obj.id === id)[0];

    setActivity({ id, name });
  };

  const addActivity = newActivity => {
    if (activities.find(e => e.name === newActivity) === undefined) {
      const newId = Math.max(...activities.map(obj => obj.id)) + 1;
      setActivities([...activities, { id: newId, name: newActivity }]);
    }
  };

  const logActivity = (id, timeSpent) => {
    setLog({
      runner: log.runner + 1,
      activities: [...log.activities, { key: log.runner, id, timeSpent }],
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
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      setActivity({ id: 1, name: activities.filter(obj => obj.id === 1)[0].name });
    }
  }, [activities]);

  useEffect(() => {
    logActivity(activity.id, workTimeNotify);
  }, [workTimeNotify]);



  return (
    <div className="activityControls">
      <ActivitySelect activities={activities} onChange={changeCurrentActivity} />
      <AddActivity onChange={addActivity} />
      <ActivityLog log={log} />
    </div>

  );
}
