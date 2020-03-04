import React, { useEffect, useState } from 'react';
import ActivityLog from './ActivityLog';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  };

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
    if (logNotifier.timeSpent === 0) return;
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
      <Grid
        container
        direction="row"
        justify="center"
        component={Paper}
        style={{ paddingBottom: '10px' }}
      >
        <Select native onChange={changeCurrentActivity} style={{ marginRight: '30px' }}>
          {activities.map(obj => (
            <option value={obj.id} key={obj.id}>
              {obj.name}
            </option>
          ))}
        </Select>
        <TextField id="newActivity" value={activityText} onChange={handleChange} />
        <Button onClick={addActivity}>Add</Button>
      </Grid>
      <ActivityLog log={log} />
    </div>
  );
}
