import { getBackgroundCSS, getBorderCSS } from '../../../../Components/utils/getCSS';

const Style = ({ id, attributes }) => {
	const { albumStyles, coverStyles } = attributes;
	const { background, border } = albumStyles;
	const { coverBorder } = coverStyles;

	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .mapsMusicSlider`;
	const albumImage = `${blockSl} .album-cover .swiper`

	return <style dangerouslySetInnerHTML={{
		__html: `
		${blockSl}{
			${getBackgroundCSS(background)};
			${getBorderCSS(border)}
		}

		${albumImage} img{
			${getBorderCSS(coverBorder)};
			width: ${coverStyles.width.desktop};
			height: ${coverStyles.height.desktop};
		}

		@media only screen and (min-width:641px) and (max-width: 1024px){
          ${albumImage} img{
            width: ${coverStyles.width.tablet};
            height: ${coverStyles.height.tablet};
          }
        }

		@media only screen and (max-width:640px){
          ${albumImage} img{
            width: ${coverStyles.width.mobile};
            height: ${coverStyles.height.mobile};
          }
        }


	`}} />;
}
export default Style;