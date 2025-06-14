import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { formatTime } from '../utils/timeUtils';

const TimerDisplay: React.FC = () => {
  const { timeLeft, timerLabel } = useAppSelector(state => state.timer);

  return (
    <div className="timer-display">
      <div id="timer-label" className="timer-label">
        {timerLabel}
      </div>
      <div id="time-left" className="time-left">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default TimerDisplay;
