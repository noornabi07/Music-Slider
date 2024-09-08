import React, { useState, useRef, useEffect } from 'react';
import { BiArrowToLeft, BiArrowToRight, FaExternalLinkAlt, GiSelfLove, ImPause, ImPlay2 } from '../../utils/icons';

const MiniPlayer = ({ attributes }) => {
  const { albumItems, albumStyles } = attributes;
  const [currentMiniSongIdx, setCurrentMiniSongIdx] = useState(0);
  const [isMiniPlaying, setIsMiniPlaying] = useState(false);
  const [progressMini, setProgressMini] = useState(0);
  const audioRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);


  useEffect(() => {
    if (isMiniPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isMiniPlaying, currentMiniSongIdx]);

  const handleNextSong = () => {
    handleImageTransition(() => {
      setCurrentMiniSongIdx((prevIdx) => (prevIdx + 1) % albumItems.length);
      setIsMiniPlaying(true); // Automatically play the next song
    });
  };

  const handlePreviousSong = () => {
    handleImageTransition(() => {
      setCurrentMiniSongIdx((prevIdx) =>
        prevIdx === 0 ? albumItems.length - 1 : prevIdx - 1
      );
      setIsMiniPlaying(true); // Automatically play the previous song
    });
  };

  const handlePlayPause = () => {
    setIsMiniPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgressMini((currentTime / duration) * 100);
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    setProgressMini(newProgress);
  };

  const handleImageTransition = (callback) => {
    setIsFadingOut(true); 
    setTimeout(() => {
      callback();
      setIsFadingOut(false); 
    }, 350); 
  };

  return (
    <div className="mini-wrapper">
      {/* Mini cover image */}
      <div className="mini-player">
        <img
          src={albumItems[currentMiniSongIdx].coverSrc}
          alt={albumItems[currentMiniSongIdx].title}
          className={`scale-fade-out ${isFadingOut ? 'scale-fade-out-active' : 'fade-in-active'}`}
        />
      </div>

      {/* Controller */}
      <div className='mini-controller'>
        <div className='loveDiv'><GiSelfLove className="love" /></div>
        <div className='linkDiv'><FaExternalLinkAlt className="link" /></div>
        {/* Backward button */}
        <div onClick={handlePreviousSong} className='leftDiv' ><BiArrowToLeft className="leftArrow" />
        </div>
        {/* Forward button */}
        <div onClick={handleNextSong} className='rightDiv'><BiArrowToRight className="rightArrow" />
        </div>

        {/* Play control button */}
        <div onClick={handlePlayPause}>
          {
            isMiniPlaying ? <ImPause className="pauseCircle" /> : <ImPlay2 className="playCircle" />
          }
        </div>
      </div>
      <div>
        <h2 className='mini-title'>{albumItems[currentMiniSongIdx].title}</h2>
        <h3 className='mini-name'>{albumItems[currentMiniSongIdx].name}</h3>
      </div>

      {/* audio player here */}
      <audio
        ref={audioRef}
        key={albumItems[currentMiniSongIdx]?.trackSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      >
        <source src={albumItems[currentMiniSongIdx].trackSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className='progress-container'>
        {/* <span className="current-time">{formatTime(currentTime)}</span> */}
        <input
          type="range"
          value={progressMini ? progressMini : 0}
          id="progress"
          onChange={handleProgressChange}
          min="0"
          max="100"
          step="0.1"
          style={{
            background: `linear-gradient(to right, ${albumStyles?.progress?.progressBarColor} ${progressMini}%, ${albumStyles?.progress?.bg} ${progressMini}%)`,
          }}
        />
        {/* <span className="duration-time">{formatTime(duration)}</span> */}
      </div>
    </div>
  );
};

export default MiniPlayer;
