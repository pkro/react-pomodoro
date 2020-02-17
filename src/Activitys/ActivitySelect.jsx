import React from 'react';

export default function ActivitySelect({ activities, onChange }) {
  return (
    <div className="custom-select">
      <select onChange={onChange}>
        {activities.map(obj => (
          <option value={obj.id} key={obj.id}>
            {obj.name}
          </option>
        ))}
      </select>
    </div>
  );
}
