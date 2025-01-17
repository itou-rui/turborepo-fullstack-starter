/** @type {import('next').NextConfig} */

/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync } = require('fs');
const { join } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { processHTMLFile, getFiles } = require('@packages/critters');

class CrittersPlugin {
	apply(compiler) {
		compiler.hooks.done.tapAsync('CrittersPlugin', async (stats, callback) => {
			if (process.env.NODE_ENV === 'production') {
				console.time('Critters: build job');

				const currentFolder = join(process.cwd(), '.next');
				const files = getFiles(currentFolder);
				const processedRoutes = [];

				for (const file of files) {
					if (file.endsWith('.html')) {
						const pagesFolder = file.split('.next/server/pages')[1];
						if (pagesFolder) {
							await processHTMLFile(file, pagesFolder).catch((e) => {
								console.error('[Warning][PageFolder]: ' + e.message);
							});

							processedRoutes.push(pagesFolder.replace('.html', '').replace('index', ''));
						}

						const appFolder = file.split('.next/server/app')[1];
						if (appFolder) {
							await processHTMLFile(file, appFolder).catch((e) => {
								console.error('[Warning][AppFolder]: ' + e.message);
							});

							processedRoutes.push(appFolder.replace('.html', '').replace('index', ''));
						}
					}
				}

				writeFileSync(join(process.cwd(), 'processedRoutes.json'), JSON.stringify(processedRoutes));

				console.timeEnd('Critters: build job');
			}
			callback();
		});
	}
}

const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ['ui'],

	webpack: (config, { isServer }) => {
		config.plugins.push(
			new CopyWebpackPlugin({
				patterns: [{ from: 'styles', to: 'static/css' }],
			}),
		);

		config.plugins.push(new CrittersPlugin());

		return config;
	},

	experimental: {
		optimizeCss: true,
	},
};

module.exports = nextConfig;
