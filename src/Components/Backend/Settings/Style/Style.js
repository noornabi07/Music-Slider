import React, { useState } from 'react';
import { PanelBody, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Background, BorderControl, Label, Typography, BColor } from '../../../../../../Components';
import { produce } from 'immer';
import { updateData } from '../../../../utils/functions';
import { Device } from '../../../Panel/Device/Device';

const Style = ({ attributes, setAttributes }) => {
  const [device, setDevice] = useState('desktop');
  const { albumStyles, albumOptions } = attributes;
  const { background, border, titleTypo, nameTypo, titleColor, nameColor, progress, controls } = albumStyles;
  const { bg, currentTimeColor, durationTimeColor, progressBarColor } = progress;

  return <>

    {/* General setting */}
    <PanelBody title={__("General Style", "music-slider")} initialOpen={false}>
      {/* Album Background Setting */}
      <Background label={__('Player Background', 'music-slider')} value={background} defaults={{ color: '#227B94' }} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.background = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} />

      {/* Album Border */}
      <BorderControl label={__('Player Border:', 'music-slider')} value={border} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.border = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaults={{ radius: '5px' }} />
    </PanelBody>

    {/* Album Images Setting */}
    {/* <PanelBody title={__("Cover Image", "music-slider")} initialOpen={false}>

      <PanelRow>
        <Label className='mb5'>{__('Padding:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <BBoxControl values={coverStyles.padding[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "padding", device) })}></BBoxControl>

      <PanelRow>
        <Label className='mb5'>{__('Cover Image Width:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={coverStyles.width[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "width", device) })} beforeIcon='grid-view' step={1}></UnitControl>


      <PanelRow>
        <Label className='mb5'>{__('Cover Image Height:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={coverStyles.height[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "height", device) })} beforeIcon='grid-view' step={1} ></UnitControl>

      <BorderControl label={__('Cover Border:', 'music-slider')} value={coverBorder} onChange={val => {
        const newStyles = produce(coverStyles, draft => {
          draft.coverBorder = val;
        })
        setAttributes({ coverStyles: newStyles });
      }} defaults={{ radius: '' }} />
    </PanelBody> */}

    {/* Album content setting */}
    <PanelBody title={__("Content", "music-slider")} initialOpen={false}>

      {/* Typo for title */}
      <Typography label={__('Title Typo', 'music-slider')} value={titleTypo} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.titleTypo = val;
        })
        setAttributes({ albumStyles: newStyles })
      }} defaults={{ fontSize: 24 }} />


      {/* Color for title */}
      <BColor label={__('Title Color', 'music-slider')} value={titleColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.titleColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#fff' />

      {/* subtitle typo */}
      <Typography label={__('Subtitle Typo', 'music-slider')} value={nameTypo} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.nameTypo = val;
        })
        setAttributes({ albumStyles: newStyles })
      }} defaults={{ fontSize: 16 }} />

      {/* Color for subtitle */}
      <BColor label={__('Subtitle Color', 'music-slider')} value={nameColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.nameColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#ddd' />
    </PanelBody>

    {/* Progress setting */}
    <PanelBody title={__("Progress", "music-slider")} initialOpen={false}>
      {/* Left duration time color */}
      <BColor label={__('Current Time Color', 'music-slider')} value={currentTimeColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.progress.currentTimeColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#fff' />

      {/* Right Duration Time Color */}
      <BColor label={__('Duration Time Color', 'music-slider')} value={durationTimeColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.progress.durationTimeColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#fff' />

      {/* progress time finished bg color */}
      <BColor label={__('Progress Finish Time Color', 'music-slider')} value={progressBarColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.progress.progressBarColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='red' />

      {/* Progress Background color */}

      <BColor label={__('Progress BG', 'music-slider')} value={bg} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.progress.bg = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#ddd' />

      {/* progress width */}
      <PanelRow>
        <Label className='mb5'>{__('Progress Width:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={albumStyles.progress.width[device]} onChange={val => setAttributes({ albumStyles: updateData(albumStyles, val, "progress", "width", device) })} beforeIcon='grid-view' max={100} step={1}></UnitControl>

    </PanelBody>

    {/* Album Controls */}

    {
      albumOptions?.activeThemes === "default" ? <PanelBody title={__("Controls", "music-slider")} initialOpen={false}>
        {/* Control button background */}

        <Background label={__('Control Button BG', 'music-slider')} value={controls?.background} onChange={val => {
          const newStyles = produce(albumStyles, draft => {
            draft.controls.background = val;
          })
          setAttributes({ albumStyles: newStyles });
        }} defaults={{ color: '#8e8c91' }} />


        <BColor label={__('Control Icon Color', 'music-slider')} value={controls?.color} onChange={val => {
          const newStyles = produce(albumStyles, draft => {
            draft.controls.color = val;
          })
          setAttributes({ albumStyles: newStyles });
        }} defaultColor='#ddd' />

        {/* control button width */}
        <PanelRow>
          <Label className='mb5'>{__('Control Icon Size:', 'music-slider')}</Label>
          <Device onChange={val => setDevice(val)} />
        </PanelRow>
        <UnitControl value={albumStyles.controls.width[device]} onChange={val => setAttributes({ albumStyles: updateData(albumStyles, val, "controls", "width", device) })} beforeIcon='grid-view' max={100} step={1}></UnitControl>
      </PanelBody>
        :
        <PanelBody title={__("Controls", "music-slider")} initialOpen={false}>
          <BColor label={__('Control Icon Color', 'music-slider')} value={controls?.miniIconColor} onChange={val => {
          const newStyles = produce(albumStyles, draft => {
            draft.controls.miniIconColor = val;
          })
          setAttributes({ albumStyles: newStyles });
          }} defaultColor='#acb8cc' />

          {/* Hover Icon Color */}
          <BColor label={__('Hover Icon Color', 'music-slider')} value={controls?.hoverMiniIconColor} onChange={val => {
          const newStyles = produce(albumStyles, draft => {
            draft.controls.hoverMiniIconColor = val;
          })
          setAttributes({ albumStyles: newStyles });
          }} defaultColor='#4527a4' />


          {/* Hover Background Color */}
          <Background label={__('Hover Background', 'music-slider')} value={controls?.hoverBgColor} onChange={val => {
            const newStyles = produce(albumStyles, draft => {
              draft.controls.hoverBgColor = val;
            })
            setAttributes({ albumStyles: newStyles });
          }} defaults={{ color: '#fff' }} />
      </PanelBody>
    }

  </>
};

export default Style;