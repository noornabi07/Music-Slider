import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';

registerBlockType(metadata, {
	icon: "format-audio",
	edit: Edit
});