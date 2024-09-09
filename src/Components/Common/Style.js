import { getBackgroundCSS, getBorderCSS, getTypoCSS } from '../../../../Components/utils/getCSS';
import { getBoxCss } from '../../utils/functions';

const Style = ({ id, attributes }) => {
	const { albumStyles, coverStyles } = attributes;
	const { background, border, titleTypo, nameTypo, titleColor, nameColor, progress, controls } = albumStyles;
	const { coverBorder } = coverStyles;
	const { bg, durationTimeColor, currentTimeColor } = progress;

	console.log("Controls object style here", controls);

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

	// MiniPlayer select class & id

	const miniHeadingSl = `${musicSliderSl} .mini-content .mini-title`;
	const miniPragraphSl = `${musicSliderSl} .mini-content .mini-name`;
	const miniProgressSl = `${musicSliderSl} .progress-container #progress`;
	const miniProgressContainerSl = `${musicSliderSl} .progress-container`;
	const miniCurrentTimeSl = `${musicSliderSl} .progress-container .current-time`;
	const miniDurationTimeSl = `${musicSliderSl} .progress-container .duration-time`;

	// icon selector all here
	const miniController = `${musicSliderSl} .mini-controller`;

	const loveDiv = `${miniController} .loveDiv`;
	const linkDiv = `${miniController} .linkDiv`;
	const leftDiv = `${miniController} .leftDiv`;
	const rightDiv = `${miniController} .rightDiv`;

	// icon color selector
	const loveIcon = `${loveDiv} .love`;
	const linkIcon = `${linkDiv} .link`;
	const leftIcon = `${leftDiv} .leftArrow`;
	const rightIcon = `${rightDiv} .rightArrow`;


	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS(headingSl, titleTypo)?.styles}
		${getTypoCSS(paragraphSl, nameTypo)?.styles}

		${getTypoCSS(miniHeadingSl, titleTypo)?.styles}
		${getTypoCSS(miniPragraphSl, nameTypo)?.styles}

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
		}
		${miniHeadingSl}{
			color: ${titleColor};
		}
		${paragraphSl}{
			color: ${nameColor};
		}
		${miniPragraphSl}{
			color: ${nameColor};
		}
		${progressSl}{
			${getBackgroundCSS(bg)}
		}
		${miniProgressSl}{
			${getBackgroundCSS(bg)}
		}
		${progressContainerSl}{
		width: ${albumStyles.progress.width.desktop};
		}
		${miniProgressContainerSl}{
		width: ${albumStyles.progress.width.desktop};
		}
		${currentTimeSl}{
		  color: ${currentTimeColor};
		}
		${miniCurrentTimeSl}{
			color: ${currentTimeColor};
		}
		${durationTimeSl}{
		 color: ${durationTimeColor};
		}
		${miniDurationTimeSl}{
			color: ${durationTimeColor};
		}
		${controlSl} button{
			width: ${albumStyles.controls.width.desktop};
		 ${getBackgroundCSS(controls?.background)}
		}
		
		${loveDiv}:hover,
		${linkDiv}:hover,
		${leftDiv}:hover,
		${rightDiv}:hover{
			${getBackgroundCSS(controls?.hoverBgColor)}
		}

		${loveIcon}:hover,
		${linkIcon}:hover,
		${leftIcon}:hover,
		${rightIcon}:hover{
			color: ${controls?.hoverMiniIconColor};
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