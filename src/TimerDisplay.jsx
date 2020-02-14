import React from 'react';
import PropTypes from 'prop-types';
import { seconds2display } from './utils';

export default function TimerDisplay({ timeLeft }) {
  const displayTime = seconds2display(timeLeft);
  return <div>{displayTime}</div>;
}

TimerDisplay.propTypes = {
  timeLeft: PropTypes.number.isRequired,
};
