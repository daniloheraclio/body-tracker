import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import AddClient from '../views/AddClient.vue';
import Client from '../views/Client.vue';
import EditClient from '../views/EditClient.vue';
import Clients from '../views/Clients.vue';
import AddTest from '../views/AddTest.vue';
import User from '../views/User.vue';

import firebase from 'firebase';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/addclient',
    name: 'Add Client',
    component: AddClient,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/client/:id',
    name: 'Client',
    component: Client,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editclient/:uid',
    name: 'Edit Client',
    component: EditClient,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addtest/:id',
    name: 'Add test',
    component: AddTest,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      requiresAuth: true
    }
  },
]

let router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// Nav guard
router.beforeEach((to, from, next) => {
  // Check for requires auth
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if(!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to root
      next();
    }
  } else if(to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if(firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
})

export default router
