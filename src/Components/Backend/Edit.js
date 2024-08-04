import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef, useState } from 'react';
import { tabController } from '../../../../Components/utils/functions';
import React from 'react';
import { songs } from '../../utils/options';
import Style from '../Common/Style';
import '../../editor.scss';
import Settings from './Settings/Settings';
import { AiFillPlayCircle, AiOutlineBackward, AiOutlineForward, AiOutlinePause, Icon283Backward, Icon284Forward2, IconBackward, IconBackwarded, IconFastBackward, IconFastForward, IconForward, IconMediaPauseOutline, IconMusic_play_button, IconPauseCircle, IconPauseFill, IconPauseOctagon, IconPlay, IconPlayCircle, IconPlayForwardSharp, IconPlayPause, IconPlaySquare } from '../../utils/icons';
import SwiperSlider from './SwiperSlider';

const Edit = (props) => {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIdx, setCurrentSongIdx] = useState(0);
	const audioRef = useRef(null);
	const swiperRef = useRef(null); // Swiper ref
	const { albumItems, albumControl } = attributes;

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
		let newIndex = currentSongIdx;

		if (direction === 'forward') {
			newIndex = (currentSongIdx + 1) % songs.length;
		} else if (direction === 'backward') {
			newIndex = (currentSongIdx - 1 + songs.length) % songs.length;
		}
		setCurrentSongIdx(newIndex);
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
		setCurrentSongIdx(index);
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
					<SwiperSlider attributes={attributes} ref={swiperRef} playTrack={playTrack} />

					<div className="music-player">
						<h1>{albumItems[currentSongIdx].title}</h1>
						<p>{albumItems[currentSongIdx].name}</p>

						<audio
							ref={audioRef}
							onTimeUpdate={updateProgress}
							onEnded={() => changeSong('forward')}
						>
							<source src={albumItems[currentSongIdx].trackSrc} type="audio/mpeg" />
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
								{albumControl?.backward === "first" && <AiOutlineBackward />}
								{albumControl?.backward === "third" && <IconBackward/> }
								{albumControl?.backward === "five" && <IconFastBackward />}
								{albumControl?.backward === "seven" && <Icon283Backward />}
								{albumControl?.backward === "nine" && <IconBackwarded />}
							</button>
							<button onClick={playPauseSong}>
								{
									isPlaying ?
										<>
											{albumControl?.pause === "pFirst" && <AiOutlinePause id="controlIcon" />}
											{albumControl?.pause === "pSecond" && <IconPauseCircle id="controlIcon" />}
											{albumControl?.pause === "pThird" && <IconPlayPause id="controlIcon" />}
											{albumControl?.pause === "pFour" && <IconPauseFill id="controlIcon" />}
											{albumControl?.pause === "pFive" && <IconMediaPauseOutline id="controlIcon" />}
										</>
										: <>
											{albumControl?.play === "sFirst" && <AiFillPlayCircle id="controlIcon" />}
											{albumControl?.play === "sSecond" && <IconPauseOctagon id="controlIcon" />}
											{albumControl?.play === "sThird" && <IconPlaySquare id="controlIcon" />}
											{albumControl?.play === "sFour" && <IconPlay id="controlIcon" />}
											{albumControl?.play === "sFive" && <IconMusic_play_button id="controlIcon" />}
										</>
								}
							</button>
							<button
								className="forward"
								onClick={() => {
									changeSong('forward');
								}}
							>
								{albumControl?.forward === "second" && <AiOutlineForward />}
								{albumControl?.forward === "four" && <IconPlayForwardSharp />}
								{albumControl?.forward === "six" && <IconFastForward />}
								{albumControl?.forward === "eight" && <Icon284Forward2/>}
								{albumControl?.forward === "ten" && <IconForward/>}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
