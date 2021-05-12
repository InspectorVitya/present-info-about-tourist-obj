import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const settings = {
  apiKet: 'd484d788-1d9f-4ff7-865e-c8b9854c046c',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};

Vue.use(YmapPlugin, settings);
