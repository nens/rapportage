const webpack = require('webpack');
const config = require('./webpack.config.js');
const WDS = require('webpack-dev-server');

const PORT = process.env.PORT || 3000;
config.devtool = 'eval-source-map';

const PROXY_SETTING = {
  '/api/v3': {
    target: 'https://demo.lizard.net/',
    secure: false,
    changeOrigin: true,
    "headers": {
      "username": "",
      "password": ""
    },
  },
   '/report/rain/images/branding': {
    target: 'https://demo.lizard.net/',
    secure: false,
    changeOrigin: true,
    "headers": {
      "username": "",
      "password": ""
    },
   },
  /* '/report/rain': {
   *   target: 'https://demo.lizard.net/',
   *   secure: false,
   *   changeOrigin: true
   * },*/
  '/accounts/login': {
    target: 'https://demo.lizard.net/',
    secure: false,
    changeOrigin: true,
    "headers": {
      "username": "",
      "password": ""
    }
  },
  // '/bootstrap/lizard': {
  //   target: 'https://demo.lizard.net/',
  //   secure: false,
  //   changeOrigin: true,
  //   "headers": {
  //     "username": "",
  //     "password": ""
  //   }
  // }
}

const password = process.env.PROXY_PASSWORD;
const username = process.env.PROXY_USERNAME;

if (password && username) {
  Object.keys(PROXY_SETTING).forEach(function(proxy) {
    PROXY_SETTING[proxy].headers.username = username;
    PROXY_SETTING[proxy].headers.password = password;
  });
} else {
  console.log("Please set PROXY_PASSWORD and PROXY_USERNAME variables!");
  // process.exit(1);
}

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
  proxy: PROXY_SETTING,
});

devserver.listen(PORT, '0.0.0.0');


// this config is the equivalent too
// webpack-dev-server --progress --colors --hot --inline --port 3000 --host 127.0.0.1 -v
// With this setup it allows for hooking up a backend on another port
