import React, { useEffect, useState } from 'react';
import ActivityLog from './ActivityLog';

export default function ActivityPanel({ logNotifier }) {
  const [log, setLog] = useState({ runner: 1, activities: [] });
  const [activities, setActivities] = useState([]);
  const [activityText, setActivityText] = useState([]);
  const [activity, setActivity] = useState({
    id: 0,
    name: 'Updating...',
  });

  const changeCurrentActivity = e => {
    const id = parseInt(e.target.value, 10);
    const { name } = activities.filter(obj => obj.id === id)[0];

    setActivity({ id, name });
  };

  const handleChange = e => {
    setActivityText(e.target.value);
  }

  const addActivity = () => {
    if (activities.find(e => e.name === activityText) === undefined && activityText.length > 0) {
      const newId = Math.max(...activities.map(obj => obj.id)) + 1;
      setActivities([...activities, { id: newId, name: activityText }]);
    }
    setActivityText('');
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
    setLog({
      runner: log.runner + 1,
      activities: [
        ...log.activities,
        { key: log.runner, name: activity.name, timeSpent: logNotifier.timeSpent },
      ],
    });
  }, [logNotifier]);

  return (
    <div id="activityPanel">
      <div id="activityControls">
        <div className="custom-select">
          <select onChange={changeCurrentActivity}>
            {activities.map(obj => (
              <option value={obj.id} key={obj.id}>
                {obj.name}
              </option>
            ))}
          </select>
        </div>

        <div className="addActivity">
          <input type="text" id="newActivity" value={activityText} onChange={handleChange} />
          <button type="button" onClick={addActivity}>Add</button>
        </div>
      </div>
      <ActivityLog log={log} />
    </div>

  );
}
