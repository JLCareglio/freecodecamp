import React from 'react';

const AudioNotification: React.FC = () => {
  return (
    <audio
      id="beep"
      preload="auto"
      src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    >
      <source src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioNotification;
