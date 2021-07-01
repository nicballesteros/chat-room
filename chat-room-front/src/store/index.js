import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

import io from 'socket.io-client';

Vue.use(Vuex);

Vue.prototype.$http = axios;

const protocol = 'http://';
const hostname = location.hostname;
const port = 3000;

export default new Vuex.Store({
  state: {
     user: {},
     token: localStorage.getItem('token') || '',
     status: '',
     socket: {},
  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
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
      state.user = {};
      //TODO close socket.
    },
    set_socket(state, socket) {
      state.socket = socket;
    },
    close_socket(state) {
      //TODO close socket.
      state.socket = {};
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
      //Set the state to logout.
      commit('logout');

      //Remove all data from the local storage. This will affect isLoggedIn() to be false.
      localStorage.removeItem('token');

      //Remove all auth headers from axios.
      delete axios.defaults.headers.common['Authorization'];
    },
    async getUserFromServer({ commit }) {
      try {
        //Get the server to give us the information on the user.
        let res = await axios.get(`${protocol}${hostname}:${port}/api/user/getuser`);

        //If there was no response from the server, throw an error. Catch it higher up and display an error msg.
        if (!res) {
          throw new Error('No response from server');
        }

        //Set the user in the store.
        commit('set_user', res.data.user);
      } catch (err) {
        console.error(err);
      }

    },
    async makeSocket({ commit }) {
      try {
        //TODO make this authenticate.
        let socket = io(`${protocol}${hostname}:${port}/api/messagesocket`);

        commit('set_socket', socket);
      } catch (err) {
        console.error(err);
      }
    },
    async closeSocket({ commit }) {
      try {
        commit('close_socket');
      } catch (err) {
        console.error(err);
      }
    },
  },
  modules: {

  },
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
    getStatus: (state) => state.status,
    isLoggedIn: (state) => !!state.token,
    getSocket: (state) => state.socket,
    hasSocket: (state) => state.socket !== {},
  }
})
