const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  apply(){
    // Process hooks here
    cogear.on('webpack.config',(webpackConfig)=>{
      webpackConfig.resolve.extensions.push('.vue');
      webpackConfig.module.rules.forEach(rule=>{
        if(Array.isArray(rule.use) && rule.use.indexOf('style-loader')){
          rule.use[rule.use.indexOf('style-loader')] = require.resolve('vue-style-loader');
        }
      });
      webpackConfig.module.rules.push({
        test: /\.vue$/,
        loader: require.resolve('vue-loader'),
        options: {
          extractCSS: cogear.mode !== 'development',
        }
      });
      webpackConfig.module.rules.push({
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: [require.resolve('pug-plain-loader')]
          },
        ]
      });
      webpackConfig.plugins.push(new VueLoaderPlugin());
    });
  }
};