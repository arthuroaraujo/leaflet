// plugins/leaflet.js
import Vue from 'vue';
import 'leaflet/dist/leaflet.css';

if (process.client) {
  const L = require('leaflet');
  Vue.prototype.$L = L;
}
