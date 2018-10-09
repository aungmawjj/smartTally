const config = {};
config.DEBUG = false;
config.baseURL = 'http://kaa.ninja:19099/api';
// config.baseURL = 'https://sale.mgecsg.com/api';
// config.baseURL = 'http://localhost:9099/api';

config.SNACKBAR_MAX_CHAR = 30;
config.SNACKBAR_AUTO_HIDE_DURATION = 3000;

config.ON_CLICK_DELAY = 100;

// 16.828192, 96.155103 Myanmar Plaza
// 16.817020, 96.131038 Junction Square
// 16.779159, 96.154043 Junction City
// 16.804343, 96.137332 Dagon Center
// 16.807949, 96.150153 center

config.accessToken = 'pk.eyJ1IjoiYXVuZ21hd2pqIiwiYSI6ImNqaWI2bGEwYjFlcWMzcHF0MDgyZXpnNnkifQ.2j1V0WXx67dFVfN8Kzw-rg';
config.map = {
  url: `https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=${config.accessToken}`,
  // url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  zoom: 14,
  center: [16.807949, 96.150153]
};

export default config;