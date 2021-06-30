import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

Vue.prototype.$http = axios;

const protocol = 'http://';
const hostname = location.hostname;

export default new Vuex.Store({
  state: {
     user: {},
     token: localStorage.getItem('token') || '',
     status: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    }
  },
  actions: {
    async login({ commit }, userCredentials) {
      try {
        commit('auth_request');

        //POST to the server to login the user.
        let res = await axios.post(`${protocol}${hostname}:3000/api/login`, userCredentials);

        //Get the token from the payload.
        const token = res.data.token;
        let user = res.data.user;

        //Store the token in localStorage for when the user reloads the page.
        localStorage.setItem('token', token);

        //Set axios headers to token.
        axios.defaults.headers.common['Authorization'] = token;

        //TODO fix the user because it contains the username and password. Hide sensitive information.
        commit('auth_success', token, user);
      } catch (err) {
        console.error(err);
      }
    },
    async register({ commit }, newUserCredentials) {
      try {
        commit('auth_request');

        let res = await axios.post(`${protocol}${hostname}:3000/api/register`, newUserCredentials);

        if (!res.data) {
          throw new Error('Response does not contain data');
        }

        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem('token', token);

        axios.defaults.headers.common['Authorization'] = token;

        //TODO find a way to hide sensitive info on user.
        commit('auth_success', token, user);
      } catch (err) {
        console.error(err);
      }
    },
    async logout({ commit }) {
      commit('logout');

      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  modules: {

  },
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getStatus: (state) => state.status,
    isLoggedIn: (state) => !!state.token,
  }
})
