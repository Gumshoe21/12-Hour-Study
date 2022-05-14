const sound = (src, volume = 1, loop) => {
  let audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;

  if (audio.ended) {
    if (audio.loop) {
      audio.play();
    }
  }

  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
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
    pause,
    setVolume,
    setSource,
    mute
  };
};

export default sound;
