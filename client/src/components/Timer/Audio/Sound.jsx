import React from 'react';

const Sound = ({ url, loop, volume }) => {
  const file = new Audio(url);
  // a way to control the volume
  // a way to play the file (if paused)
  const play = (file) => {
    if (file.paused) {
      file.play();
    }
  };
  // a way to pause (if playing)
  // looping
};

export default Sound;
