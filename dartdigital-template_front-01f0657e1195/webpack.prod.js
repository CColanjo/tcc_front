const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const webpack = require('webpack')

require('dotenv').config({ path: './.env.production' })

module.exports = (env, argv) => {
	return merge(baseWebpackConfig(env, argv), {
		mode: 'production',
		devtool: false,
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: './static/js/[name].[chunkhash].min.js'
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: './static/css/[name].[chunkhash].css'
			}),
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env)
			})
		],
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)?$/,
					exclude: /(node_modules)/,
					include: path.resolve(__dirname, 'src'),
					loader: require.resolve('babel-loader')
				}
			]
		},
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all'
					}
				}
			}
		}
	})
}
