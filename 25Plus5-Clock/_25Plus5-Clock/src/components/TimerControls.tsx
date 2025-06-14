import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { toggleTimer, resetTimer } from '../store/timerSlice';

const TimerControls: React.FC = () => {
  const { isRunning } = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();

  const handleStartStop = () => {
    dispatch(toggleTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
    // Reset audio
    const audio = document.getElementById('beep') as HTMLAudioElement;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <div className="timer-controls">
      <button
        id="start_stop"
        className="control-btn start-stop"
        onClick={handleStartStop}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
      >
        {isRunning ? <Pause size={24} /> : <Play size={24} />}
        <span>{isRunning ? 'Pause' : 'Start'}</span>
      </button>
      <button
        id="reset"
        className="control-btn reset"
        onClick={handleReset}
        aria-label="Reset timer"
      >
        <RotateCcw size={24} />
        <span>Reset</span>
      </button>
    </div>
  );
};

export default TimerControls;
