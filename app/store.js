import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

//screens
import Home from './components/Home.vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    accessToken: '',
    username: ''
  },
  getters: {
    getUserAccessToken: state => {
      return state.accessToken
    },
    loggedIn: state => {
      return state.isLoggedIn
    },
    username: state => {
      return state.username
    }
  },
  mutations: {
    setUserAccessToken(state, data){
      state.accessToken = data
    },
    setIsLoggedIn(state, data){
      state.isLoggedIn = data
    },
    setUserInformation(state, data){
      state.username = data
    }
  },
  actions: {
    getUserAccessToken({commit}, data){
      return new Promise(function(resolve, reject){
        axios.post('http://127.0.0.1:8888/example-project/public/api/login', {
          username: data.username,
          password: data.password})
            .then((response) => {
              commit('setUserAccessToken', response.data.access_token)
              commit('setIsLoggedIn', true)
              resolve(response)
            })
            .catch((error) => {
              alert(error)
              reject(error)
        })
      })
    },
    getUserInformation({commit, state},){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken

      axios.get('http://127.0.0.1:8888/example-project/public/api/user')
        .then((response) => {
          commit('setUserInformation', response.data.name)
        })
        .catch((error) => {
          commit('setUserInformation', error.response.status)
        })
    }
  }
});
