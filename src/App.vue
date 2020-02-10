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
      <div class="d-none d-lg-block">
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
      

    </div>
    <v-content class="grey lighten-5 no-padding-mobile">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>
    <div class="d-md-none">
      <v-bottom-navigation
      v-if="isLogged"
      grow
      :height="50"
      fixed
      color="purple darken-2 purple--text text--lighten-5"
      hidden-md-and-up
      
      >
        <v-btn
          v-for="menuItem in menuItems"
          :key="menuItem.path"
          :to="{path: '/'+ menuItem.path}"
        >
          <v-icon>mdi-{{ menuItem.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
    <v-footer :height="40">
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>

<script>
import DrawerMenu from './components/DrawerMenu';
import { mapState, mapActions } from "vuex";
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
    menuItems: [
      {path: '',        title: 'Home',      icon: 'home-variant-outline'},
      {path: 'clients', title: 'Clients', icon: 'account-group'},
      {path: 'addclient', title: 'Add Client',  icon: 'account-plus'},
      {path: 'user',   title: 'Account',     icon: 'account-circle'},
    ]
  }),
  created () {
    this.currentUser = firebase.auth().currentUser;
    this.$vuetify.theme.dark = false
  },
  mounted() {
    this.setUser(this.currentUser);
  },
  methods: {
    ...mapActions(['setUser']),
    goTo(route) {
      this.$router.push({name: route}); 
    },
  },
  computed: {
    isLogged() {
      return this.currentUser ? true : false;
    }
  },
  
};
</script>
<style>
@media screen and (max-width: 959px) {
  .no-padding-mobile {
    padding-top: 0 !important;
  }
}

</style>