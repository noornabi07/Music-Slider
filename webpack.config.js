const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new ESLintPlugin()
	]
};