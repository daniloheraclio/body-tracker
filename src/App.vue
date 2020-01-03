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
      color="deep-orange darken-2"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Body Tracker</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height white"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col>
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
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
