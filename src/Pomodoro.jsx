import React from 'react';
import TimerDisplay from './TimerDisplay';

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 25 * 60,
    };
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        Pomodoro
        <TimerDisplay timeLeft={timeLeft} />
      </div>
    );
  }
}
