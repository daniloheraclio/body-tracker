import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import VueFirestore from 'vue-firestore';
import Firebase from 'firebase';
import 'firebase/firestore';
// require('firebase/firestore')
 
// Vue.use(VueFirestore)

var firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyDb6yUnyTB4c3mBpaKq27exB9OUHXXx4iY",
  authDomain: "trackfit-9a0c0.firebaseapp.com",
  databaseURL: "https://trackfit-9a0c0.firebaseio.com",
  projectId: "trackfit-9a0c0",
  storageBucket: "trackfit-9a0c0.appspot.com",
  messagingSenderId: "1083075412043",
  appId: "1:1083075412043:web:b4273d32159a6b82500dce"
})  
 
export const db = firebaseApp.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
