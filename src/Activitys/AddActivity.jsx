import React, { useState } from 'react';

export default function AddActivity({ onChange }) {
  const [activity, setActivity] = useState('');

  const handleChange = e => {
    setActivity(e.target.value);
  }

  const submitChange = () => {
    onChange(activity);
    setActivity('');
  }

  return (
    <div className="addActivity">
      <input type="text" id="newActivity" value={activity} onChange={handleChange} />
      <button type="button" onClick={submitChange}>Add</button>
    </div>
  );
}
