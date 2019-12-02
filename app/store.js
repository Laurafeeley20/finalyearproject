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
    currentUser: {
      id: '',
      name: '',
      isAdmin: ''
    },
    firstUserBooking: {
      user_id: '',
      booking_type: '',
      booking_date: '',
      booking_time: ''
    },
    bookings: [],
    userBookings: []
  },
  getters: {
    getUserAccessToken: state => {
      return state.accessToken
    },
    loggedIn: state => {
      return state.isLoggedIn
    },
    username: state => {
      return state.currentUser.name
    },
    isAdmin: state => {
      return state.currentUser.isAdmin
    },
    firstUserBooking: state => {
      return `${state.firstUserBooking.booking_type === 'Private' ? '1-on-1 with Christopher Shannon' : state.firstUserBooking.booking_type} - ${state.firstUserBooking.booking_date} @ ${state.firstUserBooking.booking_time}`
    },
    bookings: state => {
      return state.bookings
    },
    allBookings: state => {
      return state.allBookings
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
      state.currentUser.id = data.id
      state.currentUser.name = data.name
      state.currentUser.isAdmin = data.isAdmin
    },
    setFirstUserBooking(state, data){
      state.firstUserBooking.user_id = data[0].user_id
      state.firstUserBooking.booking_date = data[0].date
      state.firstUserBooking.booking_time = data[0].time
      state.firstUserBooking.booking_type = data[0].booking_type
    },
    setUserBookings(state, data){
      state.bookings = data
    },
    setAllBookings(state, data){
      state.bookings = data
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
    getUserInformation({commit, state, dispatch},){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.accessToken

      axios.get('http://127.0.0.1:8888/example-project/public/api/user')
        .then((response) => {
          commit('setUserInformation', response.data)
          if (response.data.isAdmin === 1) {
            dispatch('getAllBookingsForAdmin')
          } else {
            dispatch('getUserBookings', response.data.id)
          }
        })
        .catch((error) => {
          commit('setUserInformation', error.response.status)
        })
    },
    getUserBookings({commit}, data){
      axios.get('http://127.0.0.1:8888/example-project/public/api/bookings/' + data)
      .then((response) => {
        commit('setUserBookings', response.data)
        commit('setFirstUserBooking', response.data)
      })
      .catch((error) => {
        commit('setUserBookings', error.response.status)
      })
    },
    getAllBookingsForAdmin({commit}){
      axios.get('http://127.0.0.1:8888/example-project/public/api/bookings')
      .then((response) => {
        commit('setAllBookings', response.data)
      })
      .catch((error) => {
        commit('setUserBookings', error.response.status)
      })
    }
  }
});
