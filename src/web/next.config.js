const path = require('path');
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

console.log(path.join(__dirname, 'styles/_common.scss'));
const nextConfig = {
  //webpack5: false,
  reactStrictMode: true,
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  //   additionalData : path.join(__dirname, 'styles/_common.scss')
  // },
  webpack: function (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) {
    //config.optimization.minimize = !options.dev;
    //config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
    // reduce number of chunks to be downloaded
    // NextJs does a great job to reduce script size by spliting file out
    // But Google LightHouse does not like numerous requests.
    // So limit them here
    config.optimization.splitChunks.maxInitialRequests = 3;

    // by default nextjs builder will load in order .evn.local/.evn.production, .evn
    config.plugins.push(new webpack.EnvironmentPlugin({ ...process.env }));

    //console.log(config.module.rules[3]);
    if (!dev)
      config.module.rules[3].oneOf.forEach((moduleLoader, i) => {
        Array.isArray(moduleLoader.use) &&
          moduleLoader.use.forEach(l => {
            if (
              l.loader.includes('css-loader') &&
              !l.loader.includes('postcss-loader')
            ) {
              const { getLocalIdent, ...others } = l.options.modules;
              l.options = {
                ...l.options,
                modules: {
                  ...others,
                  localIdentName: '[hash:base64:6]'
                }
              };
            }
          });
      });

    return config;
  }
};
module.exports = nextConfig;
