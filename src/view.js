import { createRoot } from 'react-dom/client';

import Style from './Components/Common/Style';
import MusicSlider from './Components/Frontend/MusicSlider';
import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-maps-music-slider');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);

		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<MusicSlider attributes={attributes} />
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});