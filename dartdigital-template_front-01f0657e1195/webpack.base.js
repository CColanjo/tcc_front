const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')

module.exports = (env, { mode }) => {
	const config = {
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		resolve: {
			extensions: ['.jsx', '.js', '.json', '.ts', '.tsx', '.css'],
			alias: {
				'~': path.resolve(__dirname, 'src'),
				'@': path.resolve(__dirname, 'public')
			}
		},
		module: {
			rules: [
				{
					test: /\.(css|less)$/,
					use: [
						{
							loader:
								mode == 'production'
									? MiniCssExtractPlugin.loader
									: 'style-loader'
						},
						{
							loader: 'css-loader'
						},
						{
							loader: 'less-loader',
							options: {
								lessOptions: {
									javascriptEnabled: true
								}
							}
						}
					]
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'images/[name].[hash].[ext]'
					}
				},
				{
					test: /\.(ttf)$/i,
					type: 'asset/resource',
					generator: {
						filename: 'fonts/[name].[hash].[ext]'
					}
				},
				// {
				// 	test: /\.(xls|xlsx)$/i,
				// 	type: 'asset/resource',
				// 	generator: {
				// 		filename: 'files/[name].[hash].[ext]'
				// 	}
				// },
				{
					test: /\.s[ac]ss$/i,
					use: [
						// Creates `style` nodes from JS strings
						'style-loader',
						// Translates CSS into CommonJS
						'css-loader',
						// Compiles Sass to CSS
						'sass-loader'
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './public/index.html',
				favicon: './public/assets/images/favicon.ico',
				inject: true
			}),
			// new CopyPlugin({
			// 	patterns: [
			// 		{ from: './public/web.config', to: '' },
			// 		{
			// 			from: 'public/assets/files',
			// 			to: 'files'
			// 		}
			// 	]
			// }),
			new CleanWebpackPlugin()
		]
	}
	return config
}
