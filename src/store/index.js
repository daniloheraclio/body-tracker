import Vue from 'vue'
import Vuex from 'vuex'
import firebase, { firestore } from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    clients: []
  },

  // MUTATIONS
  mutations: {
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_CLIENTS: (state, clients) => {
      state.clients = clients;
    },
  },

  // ACTIONS 
  actions: {
    login: ({ commit }, payload) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            uid: user.user.uid,
            email: user.user.email,
            ...user.user
          };
          commit('SET_USER', newUser);
        })
        .catch(err => console.log(err));
    },
    setUser: ({ commit }, payload) => {
      commit('SET_USER', payload);
    },
    logoutUser: ({ commit }) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('logout...');
          commit('SET_USER', null);
        })
    },
    signupUser: ({ commit }, payload) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(cred => {
          const newUser = {
            uid: cred.user.uid,
            email: cred.user.email,
            ...cred.user
          };
          return firebase.firestore().collection('users').doc(cred.user.uid).set({
            age: 30,
            cref: '002805-G/PE',
            profileUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png'
          })
          
        })
        .then(() => {
          commit('SET_USER', newUser);
        })
        .catch(err => console.log(err));
    },
    getClients: (context, uid) => {
      let clientsData = [];
      console.log('uidddd',uid)
      firebase.firestore().collection('users').doc(uid).collection('clients').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
            
            clientsData.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        });
        context.commit('SET_CLIENTS', clientsData);
      });
    },
  },

  // GETTERS
  getters: {
    clientsPreview: state => state.clients.slice(0, 4),
    user: state => state.user,
    activeClients: state => {
      return state.clients.filter(el => el.active === true);
    }
  },
})