import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PomodoroTimer from './components/PomodoroTimer';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PomodoroTimer />
      </div>
    </Provider>
  );
}

export default App;
