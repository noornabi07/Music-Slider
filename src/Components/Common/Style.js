import { getBackgroundCSS, getBorderCSS, getTypoCSS } from '../../../../Components/utils/getCSS';
import { getBoxCss } from '../../utils/functions';

const Style = ({ id, attributes }) => {
	const { albumStyles, coverStyles } = attributes;
	const { background, border, titleTypo, nameTypo, titleColor, nameColor, titlePadding, namePadding, progress, controls } = albumStyles;
	const { coverBorder } = coverStyles;
	const { bg, durationTimeColor, currentTimeColor } = progress;

	const mainSl = `#${id}`;
	const musicSliderSl = `${mainSl} .mapsMusicSlider`;
	const albumImageSl = `${musicSliderSl} .album-cover .swiper`
	const musicPlayerSl = `${musicSliderSl} .music-player`;
	const headingSl = `${musicPlayerSl} .heading`;
	const paragraphSl = `${musicPlayerSl} .paragraph`;
	const progressSl = `${musicPlayerSl} #progress`;
	const controlSl = `${musicPlayerSl} .controls`;
	const progressContainerSl = `${musicPlayerSl} .progress-container`;
	const currentTimeSl = `${progressContainerSl} .current-time`;
	const durationTimeSl = `${progressContainerSl} .duration-time`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS(headingSl, titleTypo)?.styles}
		${getTypoCSS(paragraphSl, nameTypo)?.styles}

		${musicSliderSl}{
			${getBackgroundCSS(background)}
			${getBorderCSS(border)}
		}
		${albumImageSl} img{
			${getBorderCSS(coverBorder)}
			width: ${coverStyles.width.desktop};
			height: ${coverStyles.height.desktop};
			${getBoxCss(coverStyles.padding.desktop, "padding")}
		}
		${headingSl}{
			color: ${titleColor};
			padding-top: ${titlePadding.top};
         	padding-bottom: ${titlePadding.bottom};
            padding-left: ${titlePadding.left};
            padding-right: ${titlePadding.right};
		}
		${paragraphSl}{
			color: ${nameColor};
			padding-top: ${namePadding.top}px;
         	padding-bottom: ${namePadding.bottom}px;
            padding-left: ${namePadding.left}px;
            padding-right: ${namePadding.right}px;
		}
		
		${progressSl}{
			${getBackgroundCSS(bg)}
		}
		${progressContainerSl}{
		width: ${albumStyles.progress.width.desktop};
		}
		${currentTimeSl}{
		  color: ${currentTimeColor};
		}
		${durationTimeSl}{
		 color: ${durationTimeColor};
		}
		${controlSl} button{
		width: ${albumStyles.controls.width.desktop};
		 ${getBackgroundCSS(controls?.background)}
		}



		@media only screen and (min-width:641px) and (max-width: 1024px){
          ${albumImageSl} img{
            width: ${coverStyles.width.tablet};
            height: ${coverStyles.height.tablet};
			${getBoxCss(coverStyles.padding.tablet, "padding")}
          }
		${progressSl}{
			width: ${albumStyles.progress.width.tablet};
		 }
		${controlSl} button{
		  width: ${albumStyles.controls.width.tablet};
		}
        }

		@media only screen and (max-width:640px){
          ${albumImageSl} img{
            width: ${coverStyles.width.mobile};
            height: ${coverStyles.height.mobile};
			${getBoxCss(coverStyles.padding.mobile, "padding")};
          }
		 ${progressSl}{
			width: ${albumStyles.progress.width.mobile};
		 }
		${controlSl} button{
		  width: ${albumStyles.controls.width.mobile};
		}
        }
	`}} />;
}
export default Style;