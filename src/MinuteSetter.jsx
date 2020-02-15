import React from 'react';
import TimeDisplay from './TimeDisplay';

export default function MinuteSetter({
  minutes,
  onChange,
  controlFor,
  ids = {
    display: 'timeDisplay',
    plus: 'time-increment',
    minus: 'time-decrement',
  },
}) {
  return (
    <>
      <div id={ids.display}>{minutes}</div>
      <button type="button" onClick={onChange} id={ids.minus}>
        -
      </button>
      <button type="button" onClick={onChange} id={ids.plus}>
        +
      </button>
    </>
  );
}
