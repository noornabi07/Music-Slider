import React, { useState } from 'react';
import { PanelBody, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Background, BorderControl, Label } from '../../../../../../Components';
import { produce } from 'immer';
import { updateData } from '../../../../utils/functions';
import { Device } from '../../../Panel/Device/Device';

const Style = ({ attributes, setAttributes, activeAlbum, setActiveAlbum }) => {
  const [device, setDevice] = useState('desktop');
  const { albumStyles, coverStyles } = attributes;
  const { background, border } = albumStyles;
  const { coverBorder } = coverStyles;

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
  </>
};

export default Style;