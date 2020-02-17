import React from 'react';
import PropTypes from 'prop-types';

export default function TimeDisplay({ seconds, id = 'time-display' }) {
  function seconds2display(numSeconds) {
    const minutes = Math.floor(numSeconds / 60).toString().padStart(2, '0');
    const newSeconds = (numSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${newSeconds}`;
  }

  const displayTime = seconds2display(seconds);
  return <div id={id}>{displayTime}</div>;
}

TimeDisplay.propTypes = {
  seconds: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
