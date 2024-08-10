import React, { useState } from 'react';
import { PanelBody, PanelRow, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Background, BorderControl, Label, Typography, BColor } from '../../../../../../Components';
import { produce } from 'immer';
import { updateData } from '../../../../utils/functions';
import { Device } from '../../../Panel/Device/Device';
import { BBoxControl } from '../../../Panel/BBoxControl/BBoxControl';

const Style = ({ attributes, setAttributes }) => {
  const [device, setDevice] = useState('desktop');
  const { albumStyles, coverStyles } = attributes;
  const { background, border, titleTypo, nameTypo, titleColor, nameColor, titlePadding, namePadding, progress, controls } = albumStyles;
  const { coverBorder } = coverStyles;
  const { bg, currentTimeColor, durationTimeColor } = progress;

  return <>
    
    {/* General setting */}
    <PanelBody title={__("General Style", "music-slider")} initialOpen={false}>
      {/* Album Background Setting */}
      <Background label={__('Album Background', 'music-slider')} value={background} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.background = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} />

      {/* Album Border */}
      <BorderControl label={__('Album Border:', 'music-slider')} value={border} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.border = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaults={{ radius: '5px' }} />
    </PanelBody>

    {/* Album Images Setting */}
    <PanelBody title={__("Cover Image", "music-slider")} initialOpen={false}>

      {/* Cover Padding */}
      <PanelRow>
        <Label className='mb5'>{__('Padding:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <BBoxControl values={coverStyles.padding[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "padding", device) })}></BBoxControl>

      {/* Cover width */}
      <PanelRow>
        <Label className='mb5'>{__('Cover Image Width:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={coverStyles.width[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "width", device) })} beforeIcon='grid-view' step={1}></UnitControl>

      {/* cover height */}

      <PanelRow>
        <Label className='mb5'>{__('Cover Image Height:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={coverStyles.height[device]} onChange={val => setAttributes({ coverStyles: updateData(coverStyles, val, "height", device) })} beforeIcon='grid-view' step={1} ></UnitControl>

      {/* Cover Border */}
      <BorderControl label={__('Cover Border:', 'music-slider')} value={coverBorder} onChange={val => {
        const newStyles = produce(coverStyles, draft => {
          draft.coverBorder = val;
        })
        setAttributes({ coverStyles: newStyles });
      }} defaults={{ radius: '' }} />
    </PanelBody>

    {/* Album content setting */}
    <PanelBody title={__("Album Content", "music-slider")} initialOpen={false}>

      {/* Typo for Heading */}
      <Typography label={__('Title Typo', 'music-slider')} value={titleTypo} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.titleTypo = val;
        })
        setAttributes({albumStyles: newStyles})
      }} defaults={{ fontSize: 24 }} />

      {/* Padding */}
      <BoxControl
        label={__("Title Padding", "music-slider")}
        values={titlePadding}
        onChange={(v) => {
          const newPadding = produce(albumStyles, draft => {
            draft.titlePadding = v
          })
          setAttributes({ albumStyles: newPadding })
        }}
        allowReset={true}
      />

      {/* Color for Heading */}
      <BColor label={__('Heading Color', 'music-slider')} value={titleColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.titleColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#fff' />

      {/* name typo */}
      <Typography label={__('Album Name Typo', 'music-slider')} value={nameTypo} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.nameTypo = val;
        })
        setAttributes({ albumStyles: newStyles })
      }} defaults={{ fontSize: 16 }} />

      {/* name padding */}
      <BoxControl
        label={__("Title Padding", "music-slider")}
        values={namePadding}
        onChange={(v) => {
          const newPadding = produce(albumStyles, draft => {
            draft.namePadding = v
          })
          setAttributes({ albumStyles: newPadding })
        }}
        allowReset={true}
      />
      {/* Color for Heading */}
      <BColor label={__('Album Name Color', 'music-slider')} value={nameColor} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.nameColor = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaultColor='#ddd' />
    </PanelBody>

    {/* Progress setting */}
    <PanelBody title={__("album progress", "music-slider")} initialOpen={false}>
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

      {/* Background color */}
      <Background label={__('progress bg', 'music-slider')} value={bg} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.progress.bg = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaults={{ color: '#ddd' }} />

      {/* progress width */}
      <PanelRow>
        <Label className='mb5'>{__('Progress Width:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={albumStyles.progress.width[device]} onChange={val => setAttributes({ albumStyles: updateData(albumStyles, val, "progress", "width", device) })} beforeIcon='grid-view' step={1}></UnitControl>

    </PanelBody>

    {/* Album Controls */}
    <PanelBody title={__("Album Controls", "music-slider")} initialOpen={false}>
      {/* Control button background */}
      <Background label={__('control button bg', 'music-slider')} value={controls?.background} onChange={val => {
        const newStyles = produce(albumStyles, draft => {
          draft.controls.background = val;
        })
        setAttributes({ albumStyles: newStyles });
      }} defaults={{ color: '#8e8c91' }} />

      {/* control button width */}
      <PanelRow>
        <Label className='mb5'>{__('Backward Forward Width:', 'music-slider')}</Label>
        <Device onChange={val => setDevice(val)} />
      </PanelRow>
      <UnitControl value={albumStyles.controls.width[device]} onChange={val => setAttributes({ albumStyles: updateData(albumStyles, val, "controls", "width", device) })} beforeIcon='grid-view' step={1}></UnitControl>
    </PanelBody>

  </>
};

export default Style;