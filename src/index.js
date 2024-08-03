import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import './style.scss';
import Edit from './Components/Backend/Edit';

registerBlockType(metadata, {
	icon: "format-audio",
	edit: Edit
});