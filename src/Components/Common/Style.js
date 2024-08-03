
const Style = ({ attributes, id }) => {
	const { columnGap } = attributes;
	const mainSl = `#${id}`;
	const blockSl = `${mainSl} .mapsMusicSlider`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		
	`}} />;
}
export default Style;