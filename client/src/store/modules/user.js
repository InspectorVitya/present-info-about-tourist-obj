/* eslint-disable camelcase */
/* eslint-disable no-shadow */
import axios from 'axios';
import jwt_decoder from 'jwt-decode';

const state = () => ({
  jwt: String,
  role: Number,
  login: '',
  user: Object,
  id: Number,
});

const getters = {
  ROLE: (state) => state.role,
  LOGIN: (state) => state.login,
  USER: (state) => state.user,
  USERID: (state) => state.id,
};

const actions = {
  POST_LOGIN: async ({ commit }, form) => {
    const statusCode = axios.post('/api/auth/login', form).then((res) => {
      commit('SET_JWT', res.data);
    });
    console.log(statusCode);
    return statusCode;
  },
  // eslint-disable-next-line no-unused-vars
  POST_REGISTER: async ({ commit }, form) => {
    const statusCode = axios.post('/api/auth/singup', form);
    return statusCode;
  },
  JWT_TOKEN_FROM_LOCAL: async ({ commit }) => {
    commit('SET_JWT_LOCAL');
  },
  LOGOUT: async ({ commit }) => {
    commit('LOGOUT_DEL');
  },
  GET_USER: async ({ commit }, userId) => {
    axios.get(`/api/users/${userId}`).then((res) => {
      commit('SET_USER', res.data);
    });
  },
};

const mutations = {
  SET_JWT: (state, data) => {
    localStorage.setItem('jwtToken', data.token);
    state.jwt = data.token;
    const decode = jwt_decoder(data.token);
    state.role = decode.userRol;
    state.id = decode.userId;
    state.login = decode.login;
  },
  SET_JWT_LOCAL: (state) => {
    const jwt = localStorage.getItem('jwtToken');
    state.jwt = jwt;
    const decode = jwt_decoder(jwt);
    state.role = decode.userRol;
    state.login = decode.login;
    state.id = decode.userId;
  },
  LOGOUT_DEL: (state) => {
    localStorage.removeItem('jwtToken');
    state.jwt = String;
    state.role = String;
    state.login = '';
    state.id = '';
  },
  SET_USER: (state, data) => {
    console.log(data);
    state.user = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
