import { Button, TabPanel, PanelBody, TextControl, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import React, { useState } from 'react';
import { AiFillPlayCircle, AiOutlineForward, AiOutlinePause, BsFillPlayFill, Icon284Forward2, IconFastForward, IconForward, IconMediaPauseOutline, IconMusic_play_button, IconPauseCircle, IconPauseFill, IconPlay, IconPlayForwardSharp, IconPlayPause, IconPlaySquare } from '../../../../utils/icons';
import { newItems } from '../../../../utils/options';

import { InlineMediaUpload } from '../../../../../../Components';

const General = ({ attributes, setAttributes, setActiveAlbum }) => {
	const { albumItems, albumOptions, albumControl } = attributes;
	const { openNewTab, isExternalLink, isAutoSlide } = albumOptions;
	const [selectedBfButton, setSelectedBfButton] = useState('bf1');
	const [pauseButton, setPauseButton] = useState('pb1');
	const [playButton, setPlayButton] = useState('sb1');


	// handle Image url change function 
	const handleImageUrlChange = (newUrl, index) => {
		const newAlbumItems = produce(albumItems, draft => {
			draft[index].coverSrc = newUrl;
		});
		setAttributes({ albumItems: newAlbumItems });
	};

	const removeAlbum = (idx) => {
		const newItemByRemove = produce(albumItems, draft => {
			draft.splice(idx, 1);
		});
		setAttributes({ albumItems: newItemByRemove });
	}

	const addNewAlbum = () => {
		const newAlbumItem = produce(albumItems, draft => {
			draft.push(newItems);
		})
		setAttributes({ albumItems: newAlbumItem });
		setActiveAlbum(albumItems.length);
	}

	// Duplicate Function
	const duplicateAlbum = (slide, index) => {
		const newArray = produce(albumItems, draft => {
			draft.splice(index, 0, slide);
		})
		setAttributes({ albumItems: newArray })
	}

	// handle Icon change function
	const handleChangeIcon = (prevValue, nextValue, iconName) => {
		const newAlbumControl = produce(albumControl, draft => {
			draft.backward = prevValue;
			draft.forward = nextValue;
		})
		setAttributes({ albumControl: newAlbumControl });
		setSelectedBfButton(iconName);
	};

	const handlePauseChangeIcon = (name, iconName) => {
		const newIcon = produce(albumControl, draft => {
			draft.pause = name;
		})
		setAttributes({ albumControl: newIcon })
		setPauseButton(iconName);
	}

	const handlePlayChangeIcon = (name, iconName) => {
		const newIcon = produce(albumControl, draft => {
			draft.play = name;
		})
		setAttributes({ albumControl: newIcon })
		setPlayButton(iconName);
	}

	const getButtonStyle = (stateName, iconName) => {
		return stateName === iconName
			? {
				backgroundColor: '#180161',
				color: 'white',
				border: 'none',
				outline: 'none',
				borderRadius: '4px',
				padding: '4px 7px',
				transform: 'scale(1.1)',
				transition: 'all 0.2s ease',
			}
			: {
				backgroundColor: '#f1f1f1',
				color: 'black',
				border: '1px solid #ccc',
			};
	};

	return <>
		{/* Album Panel Setting */}
		<PanelBody className='bPlPanelBody' title={__('Music Tracks', 'music-slider')} initialOpen={false}>
			{
				albumItems.map((item, index) => {
					return <PanelBody className='bPlPanelBody' onToggle={() => setActiveAlbum(index)} key={index} title={__(`Track ${index + 1}`, "music-slider")} initialOpen={false}>
						<div onClick={() => setActiveAlbum(index)}>


							{/* This is my track media upload */}
							<InlineMediaUpload label={__("Track Source", "music-slider")} value={albumItems[index].trackSrc} onChange={val => {
								const newTrack = produce(albumItems, draft => {
									draft[index].trackSrc = val;
								})
								setAttributes({ albumItems: newTrack });
							}} />

							<InlineMediaUpload className="mt10" label={__("Track Thumb", "music-slider")} value={item.coverSrc} onChange={val => {
								handleImageUrlChange(val, index)
							}} />

							{/* Title TextControl */}
							<TextControl
								className="mt10"
								label={__("Track Title", "music-slider")}
								value={albumItems[index].title}
								onChange={(newTitle) => {
									const newAlbumItems = produce(albumItems, draft => {
										draft[index].title = newTitle;
									});
									setAttributes({ albumItems: newAlbumItems });
								}}
								placeholder={__("Type here title", "music-slider")}
							></TextControl>

							{/* Name TextControl */}
							<TextControl
								label={__("Track Name", "music-slider")}
								value={albumItems[index].name}
								onChange={(newName) => {
									const newAlbumItems = produce(albumItems, draft => {
										draft[index].name = newName;
									});
									setAttributes({ albumItems: newAlbumItems });
								}}
								placeholder={__("Type here track name", "music-slider")}
							></TextControl>


							<div style={{ marginBottom: "10px" }}>
								<ToggleControl
									label="Insert external link"
									checked={isExternalLink}
									onChange={(val) => {
										const newTabs = produce(albumOptions, draft => {
											draft.isExternalLink = val
										})
										setAttributes({ albumOptions: newTabs })
									}}
								/>
							</div>

							{/* YouTube link */}
							{
								isExternalLink ? <TextControl
									label={__("External Link", "music-slider")}
									value={albumItems[index].youtubeSrc}
									onChange={(newLink) => {
										const newAlbumItems = produce(albumItems, draft => {
											draft[index].youtubeSrc = newLink;
										});
										setAttributes({ albumItems: newAlbumItems });
									}}
									placeholder={__("Submit External link", "music-slider")}
								></TextControl> : ""
							}

							{/* tab toggle control */}
							{
								isExternalLink && <ToggleControl
									label="Open in new tab"
									checked={openNewTab}
									onChange={(val) => {
										const newTabs = produce(albumOptions, draft => {
											draft.openNewTab = val
										})
										setAttributes({ albumOptions: newTabs })
									}}
								/>
							}

							{/* Remove and duplicate button */}
							<div
								style={{
									display: "flex",
									gap: "5px",
									alignItems: "center",
								}}
							>
								{/* remove button */}
								<Button
									style={{
										width: "112px",
										marginTop: "15px",
										background: "red",
										display: "flex",
										justifyContent: "center",
									}}
									icon={"trash f182"}
									variant="primary"
									onClick={() => removeAlbum(index)}>
									{__("Remove", "music-slider")}
								</Button>
								{/* Duplicate button */}
								<Button
									style={{
										width: "112px",
										marginTop: "15px",
										background: "green",
										display: "flex",
										justifyContent: "center",
									}}
									icon={"plus-alt f502"}
									variant="primary"
									onClick={() => duplicateAlbum(item, index)}
								>
									{__("Duplicate", "music-slider")}
								</Button>
							</div>


						</div>
					</PanelBody>
				})
			}

			{/* Add slide button */}
			<Button
				style={{
					width: "217px",
					background: "#4527a4",
					display: "flex",
					justifyContent: "center",
					margin: "10px auto"
				}}
				icon={"plus f132"}
				variant="primary"
				onClick={addNewAlbum}
			>
				{__("Add New Album", "music-slider")}
			</Button>
		</PanelBody>

		{/* Themes Panel Setting */}
		<PanelBody title={__('Themes', 'music-slider')} initialOpen={false}>
			<SelectControl
				label="Select Theme"
				value={albumOptions.activeThemes} // This sets the initial value
				options={[
					{ label: 'Default', value: 'default' },
					{ label: 'Slide', value: 'slide' },
				]}
				onChange={(selectedTheme) => setAttributes({ albumOptions: { ...albumOptions, activeThemes: selectedTheme } })}
			/>
		</PanelBody>

		<PanelBody title={__("Control Options ", "music-slider")} initialOpen={false}>

			{/* Auto Play Slide Toggle */}
			<ToggleControl
				label="Track Auto Slide"
				checked={isAutoSlide}
				onChange={(val) => {
					const newTabs = produce(albumOptions, draft => {
						draft.isAutoSlide = val
					})
					setAttributes({ albumOptions: newTabs })
				}}
			/>


			{/* Forward Icons */}
			<div className="arrowBtn" style={{ marginTop: "20px" }}>
				<h4>Choice Backward Forward Icons</h4>
				<button onClick={() => handleChangeIcon('first', 'second', 'bf1')} style={getButtonStyle(selectedBfButton, 'bf1')}>
					<AiOutlineForward width="24" height="24" />
				</button>
				<button onClick={() => handleChangeIcon('third', 'four', 'bf2')} style={getButtonStyle(selectedBfButton, 'bf2')}>
					<IconPlayForwardSharp width="24" height="24" />
				</button>
				<button onClick={() => handleChangeIcon('five', 'six', 'bf3')} style={getButtonStyle(selectedBfButton, 'bf3')}>
					<IconFastForward width="24" height="24" />
				</button>
				<button onClick={() => handleChangeIcon('seven', 'eight', 'bf4')} style={getButtonStyle(selectedBfButton, 'bf4')}>
					<Icon284Forward2 width="24" height="24" />
				</button>
				<button onClick={() => handleChangeIcon('nine', 'ten', 'bf5')} style={getButtonStyle(selectedBfButton, 'bf5')}>
					<IconForward width="24" height="24" />
				</button>
			</div>


			{/* Pause Icons */}
			<div className="arrowBtn" style={{ marginTop: "20px" }}>
				<h4>Choice Your Pause Icons</h4>
				<button onClick={() => handlePauseChangeIcon('pFirst', 'pb1')} style={getButtonStyle(pauseButton, 'pb1')}>
					<AiOutlinePause width="24" height="24" />
				</button>
				<button onClick={() => handlePauseChangeIcon('pSecond', 'pb2')} style={getButtonStyle(pauseButton, 'pb2')}>
					<IconPauseCircle width="24" height="24" />
				</button>
				<button onClick={() => handlePauseChangeIcon('pThird', 'pb3')} style={getButtonStyle(pauseButton, 'pb3')}>
					<IconPlayPause width="24" height="24" />
				</button>
				<button onClick={() => handlePauseChangeIcon('pFour', 'pb4')} style={getButtonStyle(pauseButton, 'pb4')}>
					<IconPauseFill width="24" height="24" />
				</button>
				<button onClick={() => handlePauseChangeIcon('pFive', 'pb5')} style={getButtonStyle(pauseButton, 'pb5')}>
					<IconMediaPauseOutline width="24" height="24" />
				</button>
			</div>

			{/* Play Icons */}
			<div className="arrowBtn" style={{ marginTop: "20px" }}>
				<h4>Choice Your Play Icons</h4>
				<button onClick={() => handlePlayChangeIcon('sFirst', 'sb1')} style={getButtonStyle(playButton, 'sb1')}>
					<AiFillPlayCircle width="24" height="24" />
				</button>
				<button onClick={() => handlePlayChangeIcon('sSecond', 'sb2')} style={getButtonStyle(playButton, 'sb2')}>
					<BsFillPlayFill width="24" height="24" />
				</button>
				<button onClick={() => handlePlayChangeIcon('sThird', 'sb3')} style={getButtonStyle(playButton, 'sb3')}>
					<IconPlaySquare width="24" height="24" />
				</button>
				<button onClick={() => handlePlayChangeIcon('sFour', 'sb4')} style={getButtonStyle(playButton, 'sb4')}>
					<IconPlay width="24" height="24" />
				</button>
				<button onClick={() => handlePlayChangeIcon('sFive', 'sb5')} style={getButtonStyle(playButton, 'sb5')}>
					<IconMusic_play_button width="24" height="24" />
				</button>
			</div>
		</PanelBody>
	</>
};

export default General;