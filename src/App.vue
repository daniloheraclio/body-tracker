<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <DrawerMenu />
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="purple darken-2 purple--text text--lighten-5"
      dense
      :elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class=""/>
      <v-spacer></v-spacer>
      <v-toolbar-title>BodyTRACKER</v-toolbar-title>
    </v-app-bar>

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
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
  methods: {
    goTo(route) {
      this.$router.push({name: route}); 
    }
  },
};
</script>
