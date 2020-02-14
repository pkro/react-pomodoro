import React from 'react';


export default function ActivitySelect({ activities, onChange }) {
  return (
    <>
      <select onChange={onChange}>
        {activities.map((obj) => (
          <option value={obj.id} key={obj.id}>{obj.activity}</option>
        ))}
      </select>
    </>
  );
}
