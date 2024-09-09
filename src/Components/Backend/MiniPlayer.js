import React, { useState, useRef, useEffect } from 'react';
import { BiArrowToLeft, BiArrowToRight, FaExternalLinkAlt, GiSelfLove, ImPause, ImPlay2 } from '../../utils/icons';

const MiniPlayer = ({ attributes }) => {
  const { albumItems, albumStyles, albumOptions } = attributes;
  const [currentMiniSongIdx, setCurrentMiniSongIdx] = useState(0);
  const [isMiniPlaying, setIsMiniPlaying] = useState(false);
  const [progressMini, setProgressMini] = useState(0);
  const [currentMiniTime, setCurrentMiniTime] = useState(0); // State for current time
  const [duration, setDuration] = useState(0); // State for duration
  const audioRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const { isExternalLink } = albumOptions;

  const targetPage = albumOptions.openNewTab ? '_blank' : '_self';

  // ----------------------------------------------------------- update code here ----------------------------
  
  // Handle play/pause
  useEffect(() => {
    if (isMiniPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isMiniPlaying, currentMiniSongIdx]);

  // Update progress, current time, and duration
  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    setCurrentMiniTime(currentTime); // Set current time
    setDuration(duration); // Set duration
    setProgressMini((currentTime / duration) * 100); // Update progress percentage
  };

  // Handle progress change
  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
    setProgressMini(newProgress);
  };

  // Handle next song with transition
  const handleNextSong = () => {
    handleImageTransition(() => {
      setCurrentMiniSongIdx((prevIdx) => (prevIdx + 1) % albumItems.length);
      setIsMiniPlaying(true); // Automatically play the next song
    });
  };

  // Handle previous song with transition
  const handlePreviousSong = () => {
    handleImageTransition(() => {
      setCurrentMiniSongIdx((prevIdx) =>
        prevIdx === 0 ? albumItems.length - 1 : prevIdx - 1
      );
      setIsMiniPlaying(true); // Automatically play the previous song
    });
  };

  // Toggle play/pause button
  const handlePlayPause = () => {
    setIsMiniPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  // Image transition function
  const handleImageTransition = (callback) => {
    setIsFadingOut(true);
    setTimeout(() => {
      callback();
      setIsFadingOut(false);
    }, 350);
  };

  // Format time in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="mini-wrapper mapsMusicSlider">
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
        <div className='loveDiv'><GiSelfLove color={albumStyles?.controls?.miniIconColor} className="love" /></div>

        {
          isExternalLink && <div className='linkDiv'>
            <a href={albumItems[currentMiniSongIdx].youtubeSrc} target={targetPage}><FaExternalLinkAlt color={albumStyles?.controls?.miniIconColor} className="link" /></a>
          </div>
        }


        {/* Backward button */}
        <div onClick={handlePreviousSong} className='leftDiv' ><BiArrowToLeft color={albumStyles?.controls?.miniIconColor} className="leftArrow" />
        </div>
        {/* Forward button */}
        <div onClick={handleNextSong} className='rightDiv'><BiArrowToRight color={albumStyles?.controls?.miniIconColor} className="rightArrow" />
        </div>

        {/* Play control button */}
        <div onClick={handlePlayPause}>
          {
            isMiniPlaying ? <ImPause color={albumStyles?.controls?.miniIconColor} className="pauseCircle" /> : <ImPlay2 color={albumStyles?.controls?.miniIconColor} className="playCircle" />
          }
        </div>
      </div>


      <div className='mini-content'>
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
        <span className="current-time">{formatTime(currentMiniTime)}</span>
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
        <span className="duration-time">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default MiniPlayer;
