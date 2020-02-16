import React from 'react';
import TimeDisplay from '../TimeDisplay';

export default function activityLog({ log }) {
  return (
    <div className="activityLog">
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
  );
}
