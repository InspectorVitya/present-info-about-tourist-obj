import Vue from 'vue';
import Vuex from 'vuex';
import dialogs from './modules/dialogs';
import categort from './modules/sites';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dialogs,
    categort,
    user,
  },
});
