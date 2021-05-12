/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import axios from 'axios';

const state = () => ({
  NewMarker: false,
  NewMarker2: false,
  NewMarkerCoords: Array,
});

const getters = {
  GET_NewMarker: (state) => state.NewMarker,
  GET_NewMarker2: (state) => state.NewMarker2,
  GET_NewMarkerCoords: (state) => state.NewMarkerCoords,
};

const actions = {
  UPD_NEW_MARKER: async ({ commit }) => {
    commit('CHANGE_NEW_MARKER');
  },
  UPD_NEW_MARKER2: async ({ commit }) => {
    commit('CHANGE_NEW_MARKER2');
  },
  SET_NEW_MARKER_COORDS: async ({ commit }, coords) => {
    commit('CHANGE_NEW_MARKER_COORDS', coords);
  },

};

const mutations = {
  CHANGE_NEW_MARKER: (state) => {
    state.NewMarker = !state.NewMarker;
  },
  CHANGE_NEW_MARKER2: (state) => {
    state.NewMarker2 = !state.NewMarker2;
  },
  CHANGE_NEW_MARKER_COORDS: (state, data) => {
    state.NewMarkerCoords = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
