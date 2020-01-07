import React from 'react';
import PropTypes from 'prop-types';

export default function TimerDisplay({ timeLeft }) {
  const minutes = Math.round(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, '0');
  return (
    <div>
      {minutes}:{seconds}
    </div>
  );
}

TimerDisplay.propTypes = {
  timeLeft: PropTypes.string.isRequired,
};
