import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';
import 'firebase/firestore';
// require('firebase/firestore')
 
// Vue.use(VueFirestore)

// insert your firebase config infos 
var firebaseApp = Firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
})  
 
export const db = firebaseApp.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
