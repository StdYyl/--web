import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: '',
    head: ''
  },
  getters: {
    name: state => state.name,
    head: state => state.head
  },
  mutations: {
    setName(state, name){
      state.name = name
    },
    setHead(state, head){
      state.head = head
    }
  }
})

export default store
