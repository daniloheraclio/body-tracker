<template>
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
</template>

<script>
export default {
  name: 'drawermenu',
  data: () => ({
    menuItems: [
      {path: '',        title: 'Dashboard', icon: 'view-dashboard'},
      {path: 'users', title: 'Users',  icon: 'account-group'},
      {path: 'adduser', title: 'Add User',  icon: 'account-plus'},
      {path: 'about',   title: 'About',     icon: 'information'},
    ]
  }),

}
</script>
