<template>
  <v-app id="inspire">
    <!-- Drawer -->
    <div v-if="isLogged">
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
      >
        <DrawerMenu/>
      </v-navigation-drawer>
      <!-- Toolbar -->
      <v-app-bar
        app
        clipped-left
        color="purple darken-2 purple--text text--lighten-5"
        dense
        :elevation="0"
      >
        <v-app-bar-nav-icon 
          @click.stop="drawer = !drawer"
          class="white--text"
        />
        <v-spacer></v-spacer>
        <v-toolbar-title>BodyTRACKER</v-toolbar-title>
      </v-app-bar>

    </div>
    <v-content class="grey lighten-4">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>

    <v-footer app :absolute="true">
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import DrawerMenu from './components/DrawerMenu';
import { mapState } from "vuex";
import firebase from "firebase";

export default {
  name: 'App',
  props: {
    source: String,
  },
  components: {
    DrawerMenu,
  },
  data: () => ({
    drawer: null,
    currentUser: '',
  }),
  created () {
    this.currentUser = firebase.auth().currentUser;
    this.$vuetify.theme.dark = false
  },
  mounted() {
    this.$store.dispatch('setUser', this.currentUser);
  },
  methods: {
    goTo(route) {
      this.$router.push({name: route}); 
    }
  },
  computed: {
    isLogged() {
      return this.currentUser ? true : false;
    }
  },
};
</script>
