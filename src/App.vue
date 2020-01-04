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
      color="white deep-orange--text darken-2"
      dense
      :elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="deep-orange--text"/>
      <v-spacer></v-spacer>
      <v-toolbar-title>BodyTRACKER</v-toolbar-title>
    </v-app-bar>

    <v-content class="white">
      <v-container
        class="white"
        fluid
      >
        <v-row
          align="start"
          justify="space-around"
        >
          <v-col cols="12">
            <v-fade-transition mode="out-in">
              <router-view></router-view>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
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
