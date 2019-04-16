const webpack = require('webpack');
const config = require('./webpack.config.js');
const WDS = require('webpack-dev-server');

const PORT = process.env.PORT || 3000;
config.devtool = 'eval-source-map';
const devserver = new WDS(webpack(config), {
//   config.entry.app.unshift(
//     "webpack-dev-server/client?http://0.0.0.0:{PORT}/"
//       .replace('{PORT}', PORT),
//     "webpack/hot/dev-server"
//   );
  hot: true,
  inline: true,
  progress: true,
  contentBase: './app',
  stats: { colors: true },
  proxy: {
    '/api/v3': {
      target: 'https://demo.lizard.net/',
      secure: false,
      changeOrigin: true
    },
    /* '/report/rain': {
     *   target: 'https://demo.lizard.net/',
     *   secure: false,
     *   changeOrigin: true
     * },*/
    '/accounts/login': {
      target: 'https://demo.lizard.net/',
      secure: false,
      changeOrigin: true
    }
  }
});

devserver.listen(PORT, '0.0.0.0');


// this config is the equivalent too
// webpack-dev-server --progress --colors --hot --inline --port 3000 --host 127.0.0.1 -v
// With this setup it allows for hooking up a backend on another port
