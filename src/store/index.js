import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    SET_USER: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    getUsers: async context => {
      let usersData = [];
      await db.collection('users').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
            
            usersData.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        });
        context.commit('SET_USER', usersData);
      });
    }
  },
  getters: {
    usersPreview: state => state.users.slice(0, 4),
  },
  modules: {
  }
})