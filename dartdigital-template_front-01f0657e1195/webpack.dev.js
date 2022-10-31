const { WebpackOpenBrowser } = require('webpack-open-browser')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { merge } = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base')

const port = 9000
const url = `http://localhost:${port}`

require('dotenv').config({ path: './.env.development' })

module.exports = (env, argv) => {
	return merge(baseWebpackConfig(env, argv), {
		output: {
			filename: '[name].js'
		},
		mode: 'development',
		target: 'web',
		devtool: 'eval-cheap-module-source-map',
		devServer: {
			port,
			historyApiFallback: true,
			hot: true
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)?$/,
					exclude: /(node_modules)/,
					include: path.resolve(__dirname, 'src'),
					use: {
						loader: 'babel-loader',
						options: {
							plugins: [require.resolve('react-refresh/babel')]
						}
					}
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': JSON.stringify(process.env)
			}),
			new WebpackOpenBrowser({ url, browser: 'chrome' }),
			new webpack.HotModuleReplacementPlugin(),
			new ReactRefreshWebpackPlugin(),
			new ForkTsCheckerWebpackPlugin({
				async: false,
				eslint: {
					files: './src/**/*.{ts,tsx,js,jsx}'
				}
			})
		]
	})
}
