export interface TimerState {
  breakLength: number;
  sessionLength: number;
  timeLeft: number;
  timerLabel: 'Session' | 'Break';
  isRunning: boolean;
  currentMode: 'session' | 'break';
}

export type TimerAction =
  | { type: 'SET_BREAK_LENGTH'; payload: number }
  | { type: 'SET_SESSION_LENGTH'; payload: number }
  | { type: 'SET_TIME_LEFT'; payload: number }
  | { type: 'SET_TIMER_LABEL'; payload: 'Session' | 'Break' }
  | { type: 'SET_IS_RUNNING'; payload: boolean }
  | { type: 'SET_CURRENT_MODE'; payload: 'session' | 'break' }
  | { type: 'RESET_TIMER' };

export function isTimerAction(action: { type: string }): action is TimerAction {
  return [
    'SET_BREAK_LENGTH',
    'SET_SESSION_LENGTH',
    'SET_TIME_LEFT',
    'SET_TIMER_LABEL',
    'SET_IS_RUNNING',
    'SET_CURRENT_MODE',
    'RESET_TIMER',
  ].includes(action.type);
}
