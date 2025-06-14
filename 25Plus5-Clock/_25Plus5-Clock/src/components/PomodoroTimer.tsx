import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { decrementTime, switchMode } from '../store/timerSlice';
import LengthControl from './LengthControl';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';
import AudioNotification from './AudioNotification';
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
} from '../store/timerSlice';

const PomodoroTimer: React.FC = () => {
  const { isRunning, timeLeft, breakLength, sessionLength } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    } else if (timeLeft === 0) {
      // Play audio notification
      const audio = document.getElementById('beep') as HTMLAudioElement;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }

      // Switch mode
      dispatch(switchMode());
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, dispatch]);

  return (
    <div className="pomodoro-timer">
      <div className="timer-container">
        <h1 className="app-title">25 + 5 Clock</h1>

        <div className="controls-section">
          <LengthControl
            id="break"
            title="Break Length"
            length={breakLength}
            onIncrement={() => dispatch(incrementBreak())}
            onDecrement={() => dispatch(decrementBreak())}
          />
          <LengthControl
            id="session"
            title="Session Length"
            length={sessionLength}
            onIncrement={() => dispatch(incrementSession())}
            onDecrement={() => dispatch(decrementSession())}
          />
        </div>

        <TimerDisplay />
        <TimerControls />
        <AudioNotification />
      </div>
    </div>
  );
};

export default PomodoroTimer;
