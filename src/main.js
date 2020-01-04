import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';
// require('firebase/firestore')
import 'firebase/firestore';
import { firebaseConfig } from './firebaseConfig.js';
 

// insert your firebase config infos from config file
var firebaseApp = Firebase.initializeApp({...firebaseConfig})  
 
export const db = firebaseApp.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
