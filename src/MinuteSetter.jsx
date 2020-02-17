import React from 'react';

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
      <div style={{ borderBottom: "1px solid", marginTop: "2%" }}>
        {title}
      </div>
      <div className="minuteDisplay" id={ids.display} style={{ marginTop: "2%", marginBottom: "2%" }}>
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
    </div >
  );
}
