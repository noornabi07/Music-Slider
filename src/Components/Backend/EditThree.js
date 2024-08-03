import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from 'react';
import { tabController } from '../../../../Components/utils/functions';
import React from 'react';
import { songs } from '../../utils/options';
import Style from '../Common/Style';
import Settings from './Settings/Settings';
import { AiFillPlayCircle, AiOutlineBackward, AiOutlineForward, AiOutlinePause } from '../../utils/icons';
import SwiperSlider from './SwiperSlider';

const EditThree = (props) => {
  const { attributes, setAttributes, clientId, isSelected } = props;
  const { currentSongIndex } = attributes;
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const swiperRef = useRef(null); // Swiper ref

  useEffect(() => tabController(), [isSelected]);

  const playPauseSong = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const changeSong = (direction) => {
    const audio = audioRef.current;
    let newIndex = currentSongIndex;

    if (direction === 'forward') {
      newIndex = (currentSongIndex + 1) % songs.length;
    } else if (direction === 'backward') {
      newIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }

    setAttributes({ currentSongIndex: newIndex });
    audio.src = songs[newIndex].source;
    if (isPlaying) {
      audio.play();
    }

    // Use Swiper ref to navigate slides
    if (swiperRef.current) {
      swiperRef.current.slideTo(newIndex);
    }
  };

  const playTrack = (index) => {
    const audio = audioRef.current;
    setAttributes({ currentSongIndex: index });
    audio.src = songs[index].source;
    if (isPlaying) {
      audio.play();
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  };

  return (
    <>
      <Settings {...{ attributes, setAttributes }} />

      <div {...useBlockProps()}>
        <Style attributes={attributes} id={`block-${clientId}`} />

        <div className="mapsMusicSlider">
          <SwiperSlider ref={swiperRef} playTrack={playTrack} />

          <div className="music-player">
            <h1>{songs[currentSongIndex].title}</h1>
            <p>{songs[currentSongIndex].name}</p>

            <audio
              ref={audioRef}
              onTimeUpdate={updateProgress}
              onEnded={() => changeSong('forward')}
            >
              <source src={songs[currentSongIndex].source} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <input
              type="range"
              value={progress}
              id="progress"
              onChange={handleSeek}
              min="0"
              max="100"
              step="0.1"
            />

            <div className="controls">
              <button
                className="backward"
                onClick={() => {
                  changeSong('backward');
                }}
              >
                <AiOutlineBackward />
              </button>
              <button onClick={playPauseSong}>
                {isPlaying ? <AiOutlinePause id="controlIcon" /> : <AiFillPlayCircle id="controlIcon" />}
              </button>
              <button
                className="forward"
                onClick={() => {
                  changeSong('forward');
                }}
              >
                <AiOutlineForward />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditThree;
