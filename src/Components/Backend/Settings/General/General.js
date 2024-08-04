import React, { useState } from 'react';
import { PanelBody, Button, TextControl, ToggleControl } from '@wordpress/components';
import { MediaUpload } from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { newItems } from '../../../../utils/options';
import { AiOutlineForward, IconPlayForwardSharp, IconFastForward, Icon284Forward2, IconForward, AiOutlinePause, IconPauseCircle, IconPlayPause, IconPauseFill, IconMediaPauseOutline, AiFillPlayCircle, IconPlayCircle, IconPlaySquare, IconPlay, IconMusic_play_button, IconPauseOctagon } from '../../../../utils/icons';

const General = ({ attributes, setAttributes, activeAlbum, setActiveAlbum }) => {
  const [selectedForwardIcon, setSelectedForwardIcon] = useState(null);
  const { albumItems, albumOptions, albumControl } = attributes;
  const { openNewTab } = albumOptions;


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
  const handleChangeIcon = (prevValue, nextValue) => {
    const newAlbumControl = produce(albumControl, draft => {
      draft.backward = prevValue;
      draft.forward = nextValue;
    })
    setAttributes({ albumControl: newAlbumControl });
  };

  const handlePauseChangeIcon = (name) => {
    const newIcon = produce(albumControl, draft => {
      draft.pause = name;
    })
    setAttributes({albumControl: newIcon})
  } 

  const handlePlayChangeIcon = (name) => {
    const newIcon = produce(albumControl, draft => { 
      draft.play = name;
    })
    setAttributes({albumControl: newIcon})
  }




  return <>
    {/* Album Panel Setting */}
    <PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Albums', 'music-slider')} initialOpen={false}>
      {
        albumItems.map((item, index) => {
          return <PanelBody onToggle={() => setActiveAlbum(index)} key={index} title={__(`Album ${index + 1}`, "music-slider")} initialOpen={false}>
            <div onClick={() => setActiveAlbum(index)}>
              {/* Album cover image url */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "-18px",
                }}
              >
                {/* image url control */}
                <TextControl
                  label={__("Album Image URL", "n-slider")}
                  value={item.coverSrc}
                  onChange={(val) => handleImageUrlChange(val, index)}
                ></TextControl>
                {/* image upload button */}
                <MediaUpload
                  onSelect={(newMedia) => handleImageUrlChange(newMedia.url, index)}
                  render={({ open }) => (
                    <Button
                      onClick={open}
                      style={{
                        background: "#4527a4",
                        color: "white",
                        height: "32px",
                        marginTop: "16px",
                      }}
                      icon={"upload f317"}
                    ></Button>
                  )}
                ></MediaUpload>
              </div>

              {/* Track source url */}
              <div className='textControl'>
                <TextControl
                  label={__("Track Source Url", "music-slider")}
                  value={albumItems[index].trackSrc}
                  onChange={(newTrack) => {
                    const newSlideItems = produce(albumItems, draft => {
                      draft[index].trackSrc = newTrack;
                    });
                    setAttributes({ albumItems: newSlideItems });
                  }}
                  placeholder={__("Submit your track link", "music-slider")}
                ></TextControl>
              </div>

              {/* Title TextControl */}
              <div>
                <TextControl
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
              </div>

              {/* Name TextControl */}
              <div>
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
              </div>


              {/* YouTube link */}
              <div>
                <TextControl
                  label={__("YouTube Source", "music-slider")}
                  value={albumItems[index].youtubeSrc}
                  onChange={(newLink) => {
                    const newAlbumItems = produce(albumItems, draft => {
                      draft[index].youtubeSrc = newLink;
                    });
                    setAttributes({ albumItems: newAlbumItems });
                  }}
                  placeholder={__("Submit youtube link", "music-slider")}
                ></TextControl>
              </div>

              {/* Open New tab youtube */}
              {/* tab toggle control */}
              <div>
                <ToggleControl
                  label="Open in new tab"
                  checked={openNewTab}
                  onChange={(val) => {
                    const newTabs = produce(albumOptions, draft => {
                      draft.openNewTab = val
                    })
                    setAttributes({ albumOptions: newTabs })
                  }}
                />
              </div>

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


    <PanelBody title={__("Album Control", "music-slider")} initialOpen={false}>
      {/* Forward Icons */}
      <div className="arrowBtn" style={{ marginTop: "20px" }}>
        <h4>Choice Backward Forward Icons</h4>
        <button onClick={() => handleChangeIcon('first', 'second')}>
          <AiOutlineForward width="24" height="24" />
        </button>
        <button onClick={() => handleChangeIcon('third', 'four')}>
          <IconPlayForwardSharp width="24" height="24" />
        </button>
        <button onClick={() => handleChangeIcon('five', 'six')}>
          <IconFastForward width="24" height="24" />
        </button>
        <button onClick={() => handleChangeIcon('seven', 'eight')}>
          <Icon284Forward2 width="24" height="24" />
        </button>
        <button onClick={() => handleChangeIcon('nine', 'ten')}>
          <IconForward width="24" height="24" />
        </button>
      </div>


      {/* Pause Icons */}
      <div className="arrowBtn" style={{ marginTop: "20px" }}>
        <h4>Choice Your Pause Icons</h4>
        <button onClick={() => handlePauseChangeIcon('pFirst')}>
          <AiOutlinePause width="24" height="24" />
        </button>
        <button onClick={() => handlePauseChangeIcon('pSecond')}>
          <IconPauseCircle width="24" height="24" />
        </button>
        <button onClick={() => handlePauseChangeIcon('pThird')}>
          <IconPlayPause width="24" height="24" />
        </button>
        <button onClick={() => handlePauseChangeIcon('pFour')}>
          <IconPauseFill width="24" height="24" />
        </button>
        <button onClick={() => handlePauseChangeIcon('pFive')}>
          <IconMediaPauseOutline width="24" height="24" />
        </button>
      </div>

      {/* Play Icons */}
      <div className="arrowBtn" style={{ marginTop: "20px" }}>
        <h4>Choice Your Play Icons</h4>
        <button onClick={() => handlePlayChangeIcon('sFirst')}>
          <AiFillPlayCircle width="24" height="24" />
        </button>
        <button onClick={() => handlePlayChangeIcon('sSecond')}>
          <IconPauseOctagon width="24" height="24" />
        </button>
        <button onClick={() => handlePlayChangeIcon('sThird')}>
          <IconPlaySquare width="24" height="24" />
        </button>
        <button onClick={() => handlePlayChangeIcon('sFour')}>
          <IconPlay width="24" height="24" />
        </button>
        <button onClick={() => handlePlayChangeIcon('sFive')}>
          <IconMusic_play_button width="24" height="24" />
        </button>
      </div>
    </PanelBody>
  </>
};

export default General;