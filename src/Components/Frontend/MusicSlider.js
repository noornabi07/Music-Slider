import { AiFillPlayCircle, AiOutlineBackward, AiOutlineForward, AiOutlinePause, BsFillPlayFill, Icon283Backward, Icon284Forward2, IconBackward, IconBackwarded, IconFastBackward, IconFastForward, IconForward, IconMediaPauseOutline, IconMusic_play_button, IconPauseCircle, IconPauseFill,IconPlay, IconPlayForwardSharp, IconPlayPause, IconPlaySquare } from "../../utils/icons";
import SwiperSlider from "../Backend/SwiperSlider";
import Style from "../Common/Style";
import { useRef, useState, useEffect } from 'react';

const MusicSlider = ({ attributes }) => {
	const { albumItems, albumControl, albumOptions, albumStyles } = attributes;
	const { controls } = albumStyles;
	const { isExternalLink } = albumOptions;
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSongIdx, setCurrentSongIdx] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const { isAutoSlide } = albumOptions;
	const audioRef = useRef(null);
	const swiperRef = useRef(null);


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

	useEffect(() => {
		const audio = audioRef.current;

		const handleLoadedMetadata = () => {
			setDuration(audio.duration);
		};

		audio.addEventListener('loadedmetadata', handleLoadedMetadata);

		return () => {
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
		};
	}, [audioRef]);

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	};

	const changeSong = (direction) => {
		const audio = audioRef.current;
		let newIndex = currentSongIdx;

		if (direction === 'forward') {
			newIndex = (currentSongIdx + 1) % albumItems.length;
		} else if (direction === 'backward') {
			newIndex = (currentSongIdx - 1 + albumItems.length) % albumItems.length;
		}

		setCurrentSongIdx(newIndex);
		audio.src = albumItems[newIndex].trackSrc;

		audio.load();

		if (isPlaying) {
			audio.play().catch((error) => {
				console.error('Audio play failed:', error);
			});
		}

		// Use Swiper ref to navigate slides
		if (swiperRef.current) {
			swiperRef.current.slideTo(newIndex);
		}
	};

	const playTrack = (index) => {
		const audio = audioRef.current;
		setCurrentSongIdx(index);
		audio.src = albumItems[index].trackSrc;

		// Ensure the audio element loads the new source
		audio.load();

		if (isPlaying) {
			audio.play().catch((error) => {
				console.error('Audio play failed:', error);
			});
		}
	};

	const updateProgress = () => {
		const audio = audioRef.current;
		const currentTime = audio.currentTime;
		setCurrentTime(currentTime);

		const progress = (currentTime / audio.duration) * 100;
		setProgress(progress);
	};

	const handleSeek = (event) => {
		const audio = audioRef.current;
		const seekTime = (event.target.value / 100) * audio.duration;
		audio.currentTime = seekTime;
	};

	return <>

		<Style attributes={attributes} />

		<div className="mapsMusicSlider">
			<SwiperSlider attributes={attributes} ref={swiperRef} playTrack={playTrack} />

			<div className="music-player">
				{isExternalLink ? <a href={albumItems[currentSongIdx].youtubeSrc} target='_blank' rel='noopener noreferrer' className='heading'>{albumItems[currentSongIdx].title}</a> : <h2 className='heading'>{albumItems[currentSongIdx].title}</h2>}
				<p>{albumItems[currentSongIdx].name}</p>

				<audio
					ref={audioRef}
					onTimeUpdate={updateProgress}
					onEnded={() => {
						if (isAutoSlide) {
							changeSong('forward');
							swiperRef.current.slideTo((currentSongIdx + 1) % albumItems.length);
						} else {
							setIsPlaying(false);
						}
					}}
				>
					<source src={albumItems[currentSongIdx].trackSrc} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>

				<div className='progress-container'>
					<span className="current-time">{formatTime(currentTime)}</span>
					<input
						type="range"
						value={progress ? progress : 0}
						id="progress"
						onChange={handleSeek}
						min="0"
						max="100"
						step="0.1"
						style={{
							background: `linear-gradient(to right, ${albumStyles?.progress?.progressBarColor} ${progress}%, ${albumStyles?.progress?.bg} ${progress}%)`,
						}}
					/>
					<span className="duration-time">{formatTime(duration)}</span>
				</div>

				<div className="controls">
					<button
						className="backward"
						onClick={() => {
							changeSong('backward');
						}}
					>
						{albumControl?.backward === "first" && <AiOutlineBackward color={controls?.color} />}
						{albumControl?.backward === "third" && <IconBackward color={controls?.color} />}
						{albumControl?.backward === "five" && <IconFastBackward color={controls?.color} />}
						{albumControl?.backward === "seven" && <Icon283Backward color={controls?.color} />}
						{albumControl?.backward === "nine" && <IconBackwarded color={controls?.color} />}
					</button>
					<button onClick={playPauseSong}>
						{
							isPlaying ?
								<>
									{albumControl?.pause === "pFirst" && <AiOutlinePause id="controlIcon" color={controls?.color} />}
									{albumControl?.pause === "pSecond" && <IconPauseCircle id="controlIcon" color={controls?.color} />}
									{albumControl?.pause === "pThird" && <IconPlayPause id="controlIcon" color={controls?.color} />}
									{albumControl?.pause === "pFour" && <IconPauseFill id="controlIcon" color={controls?.color} />}
									{albumControl?.pause === "pFive" && <IconMediaPauseOutline id="controlIcon" color={controls?.color} />}
								</>
								: <>
									{albumControl?.play === "sFirst" && <AiFillPlayCircle id="controlIcon" color={controls?.color} />}
									{albumControl?.play === "sSecond" && <BsFillPlayFill style={{ marginLeft: "3px" }} color={controls?.color} id="controlIcon" />}
									{albumControl?.play === "sThird" && <IconPlaySquare id="controlIcon" color={controls?.color} />}
									{albumControl?.play === "sFour" && <IconPlay id="controlIcon" style={{ marginLeft: "3px" }} color={controls?.color} />}
									{albumControl?.play === "sFive" && <IconMusic_play_button id="controlIcon" color={controls?.color} />}
								</>
						}
					</button>
					<button
						className="forward"
						onClick={() => {
							changeSong('forward');
						}}
					>
						{albumControl?.forward === "second" && <AiOutlineForward color={controls?.color} />}
						{albumControl?.forward === "four" && <IconPlayForwardSharp color={controls?.color} />}
						{albumControl?.forward === "six" && <IconFastForward color={controls?.color} />}
						{albumControl?.forward === "eight" && <Icon284Forward2 color={controls?.color} />}
						{albumControl?.forward === "ten" && <IconForward color={controls?.color} />}
					</button>
				</div>
			</div>
		</div>

	</>
}
export default MusicSlider;