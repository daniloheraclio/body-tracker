import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';
import router from 'router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    users: []
  },

  // MUTATIONS
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_USERS: (state, users) => {
      state.users = users;
    },
  },
  actions: {
    login: async ({ commit }, payload) => {
      console.log('action user payload: ', payload);
      const result = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);

     
          
      const currentUser = {
        id: result.user.uid,
        email: result.user.email,
      }
    },
    setUser: ({ commit }, payload) => {
      commit('SET_USER', payload);
    },
    logout: ({ commit }) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('logout...');
        })
    },
    signupUser: ({ commit }, payload) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          
          const newUser = {
            uid: user.user.uid,
            email: user.user.email,
            ...user.user
          };
          console.log('newUser', newUser);
          commit('SET_USER', newUser);
        })
        .catch(err => console.log(err));
    },
    getUsers: async context => {
      let usersData = [];
      await firebase.firestore().collection('users').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
            
            usersData.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        });
        context.commit('SET_USERS', usersData);
      });
    }
  },
  getters: {
    usersPreview: state => state.users.slice(0, 4),
  },
})