import React from 'react';
import TimeDisplay from './TimeDisplay';

export default function MinuteSetter({
  minutes,
  onChange,
  title = "Minutes:",
  ids = {
    display: 'timeDisplay',
    plus: 'time-increment',
    minus: 'time-decrement',
  },
}) {
  return (
    <div className="minuteSetter">
      {title}
      <div className="minuteDisplay" id={ids.display}>
        {minutes}
      </div>
      <div className="minuteSetterButtons">
        <button type="button" onClick={onChange} id={ids.minus}>
          -
        </button>
        <button type="button" onClick={onChange} id={ids.plus}>
          +
        </button>
      </div>
    </div>
  );
}
