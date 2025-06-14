import { createSlice } from '@reduxjs/toolkit';
import { TimerState } from '../types/timer';

const initialState: TimerState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60, // 25 minutes in seconds
  timerLabel: 'Session',
  isRunning: false,
  currentMode: 'session',
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementBreak: state => {
      if (!state.isRunning && state.breakLength < 60) {
        state.breakLength += 1;
      }
    },
    decrementBreak: state => {
      if (!state.isRunning && state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    incrementSession: state => {
      if (!state.isRunning && state.sessionLength < 60) {
        state.sessionLength += 1;
        if (state.currentMode === 'session') {
          state.timeLeft = state.sessionLength * 60;
        }
      }
    },
    decrementSession: state => {
      if (!state.isRunning && state.sessionLength > 1) {
        state.sessionLength -= 1;
        if (state.currentMode === 'session') {
          state.timeLeft = state.sessionLength * 60;
        }
      }
    },
    toggleTimer: state => {
      state.isRunning = !state.isRunning;
    },
    decrementTime: state => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    switchMode: state => {
      if (state.currentMode === 'session') {
        state.currentMode = 'break';
        state.timerLabel = 'Break';
        state.timeLeft = state.breakLength * 60;
      } else {
        state.currentMode = 'session';
        state.timerLabel = 'Session';
        state.timeLeft = state.sessionLength * 60;
      }
    },
    resetTimer: state => {
      state.breakLength = 5;
      state.sessionLength = 25;
      state.timeLeft = 25 * 60;
      state.timerLabel = 'Session';
      state.isRunning = false;
      state.currentMode = 'session';
    },
  },
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  toggleTimer,
  decrementTime,
  switchMode,
  resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
