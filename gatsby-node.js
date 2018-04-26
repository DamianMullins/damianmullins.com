var cssnext = require('postcss-cssnext');

exports.modifyWebpackConfig = function(config, env) {
  config.merge({
    postcss: [
      cssnext({
        browsers: ['> 5%', 'last 2 versions', 'Safari >= 8', 'not ie 10']
      })
    ]
  });

  return config;
};
