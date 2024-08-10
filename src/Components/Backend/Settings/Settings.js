import { AlignmentToolbar, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Dashicon, TabPanel, ToolbarButton, ToolbarGroup, } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';

// Settings Components
import { tabController } from '../../../../../Components/utils/functions';

import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Style from './Style/Style';

const Settings = ({ attributes, setAttributes, setActiveIndex }) => {
	const { items, alignment, textAlign } = attributes;
	const [activeAlbum, setActiveAlbum] = useState(0);


	const addItem = () => {
		setAttributes({
			items: [...items, {
				number: 10,
				text: 'Vertical'
			}]
		});
		setActiveIndex(items.length);
	}

	return <>
		<InspectorControls>
			<div className='bBlocksInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/music-slider' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					<General activeAlbum={activeAlbum} setActiveAlbum={setActiveAlbum} attributes={attributes} setAttributes={setAttributes} />
				</>}

				{'style' === tab.name && <>
					<Style activeAlbum={activeAlbum} setActiveAlbum={setActiveAlbum} attributes={attributes} setAttributes={setAttributes} />
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<ToolbarGroup className='bPlToolbar'>
				<ToolbarButton label={__('Add New Item', 'music-slider')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
			</ToolbarGroup>

			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Music Slider Alignment')} alignmentControls={[
				{ title: __('Music Slider in left', 'music-slider'), align: 'left', icon: 'align-left' },
				{ title: __('Music Slider in center', 'music-slider'), align: 'center', icon: 'align-center' },
				{ title: __('Music Slider in right', 'music-slider'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={textAlign} onChange={val => setAttributes({ textAlign: val })} />
		</BlockControls>
	</>;
};
export default Settings;