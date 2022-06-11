const sound = (src, volume = 1, loop) => {
  let audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;

  if (audio.ended) {
    if (audio.loop) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  const play = () => {
    if (audio.paused) {
      audio.play();
    }
  };

  const toggle = () => {
    audio.paused ? audio.play() : audio.pause();
  };

  const stop = () => {
    if (audio.loop) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const setVolume = (val) => {
    audio.volume = val;
  };

  const setSource = (source) => {
    audio.src = source;
  };

  const mute = (bool = true) => {
    audio.muted = bool;
  };

  return {
    play,
    toggle,
    stop,
    setVolume,
    setSource,
    mute
  };
};

export default sound;
