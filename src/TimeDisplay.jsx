import React from 'react';
import PropTypes from 'prop-types';
import { seconds2display } from './utils';

export default function TimeDisplay({ seconds }) {
  const displayTime = seconds2display(seconds);
  return <div>{displayTime}</div>;
}

TimeDisplay.propTypes = {
  seconds: PropTypes.number.isRequired,
};
