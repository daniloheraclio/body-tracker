import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import AddUser from '../views/AddUser.vue';
import User from '../views/User.vue';
import EditUser from '../views/EditUser.vue';
import Users from '../views/Users.vue';
import AddTest from '../views/AddTest.vue';
import About from '../views/About.vue';

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
    path: '/adduser',
    name: 'Add user',
    component: AddUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'User',
    component: User,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edituser/:uid',
    name: 'Edit User',
    component: EditUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/addtest',
    name: 'Add test',
    component: AddTest,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
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
