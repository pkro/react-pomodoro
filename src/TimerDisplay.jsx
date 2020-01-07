import React from 'react';
import PropTypes from 'prop-types';

export default function TimerDisplay(props) {
  return (<div>
    {props.timeLeft}
  </div>);
}

TimerDisplay.propTypes = {
  timeLeft: PropTypes.string.isRequired,
}