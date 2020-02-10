<template>
<div v-if="isLogged">
  <div>
    <v-layout
      column
      align-center
    >
      <v-row class="mt-5">
        <v-col cols="12">
          <v-avatar size="100" round>
            <v-img
              src="https://api.adorable.io/avatars/285/abott@adorable.png"
              class="white--text align-center text-center text-uppercase"
            />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <p class="purple--text text--darken-2">{{ user.email || ''}}</p>
        </v-col>
      </v-row>
    </v-layout>
    <v-list dense>
      <v-list-item
        v-for="menuItem in menuItems"
        :key="menuItem.path"
        :to="{path: '/'+ menuItem.path}"
      >
        <v-list-item-action>
          <v-icon>mdi-{{ menuItem.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
        </v-list-item-content>
        
      </v-list-item>

    </v-list>
  </div>
  <div class="pa-2 align-self-end">
    <v-btn
      @click="logout"
      depressed
      block 
      color="purple darken-2 purple--text text--lighten-5"
    >
      Logout
    </v-btn>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'drawermenu',
  data: () => ({
    menuItems: [
      {path: '',        title: 'Home', icon: 'view-dashboard'},
      {path: 'clients',   title: 'Clients',     icon: 'account-group'},
      {path: 'addclient', title: 'Add Client',  icon: 'account-plus'},
      {path: 'user',   title: 'Account',     icon: 'account-circle'},
    ]
  }),
  methods: {
    ...mapActions(['logoutUser']),
    async logout() {
      try {
        await this.logoutUser();
        this.$router.go({ path: this.$router.path });
      } catch (err) {
        console.log(err);
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
    isLogged() {
      return this.user !== undefined && this.user !== null;
    },
  },

}
</script>
