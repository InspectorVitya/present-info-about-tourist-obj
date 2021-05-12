/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const state = () => ({
  category: Array,
  sites: Array,
  site: Object,
});

const getters = {
  CATEGORY: (state) => state.category,
  SITES: (state) => state.sites,
  SITE_ONE: (state) => state.site,
};

const actions = {
  GET_CATEGORY: async ({ commit }) => {
    axios.get('/api/category').then((res) => {
      commit('SET_CATEGORY', res.data);
    });
  },
  GET_SITES: async ({ commit }, filter) => {
    axios.get(`/api/sites/all?filter=${filter}`).then((res) => {
      commit('SET_SITES', res.data);
    });
  },
  GET_SITE: async ({ commit }, id) => {
    axios.get(`/api/sites/${id}`)
      .then((res) => {
        commit('SET_SITE', res.data);
      });
  },

};

const mutations = {
  SET_CATEGORY: (state, data) => {
    state.category = data;
  },
  SET_SITES: (state, data) => {
    state.sites = data;
  },
  SET_SITE: (state, data) => {
    state.site = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
