<template>
  <v-row no-gutters>
    <v-col class="mx-auto">
      <v-sheet
        class="mx-auto pa-4"
        max-width="720px"
      > 
        
        <p class="display-1 grey--text text--darken-2">
          <v-icon large color="grey darken-2" class="mb-2 mr-2">
            mdi-account-group
          </v-icon>
          Users
        </p>
      </v-sheet>
      <v-sheet
        class="mx-auto pa-4"
        color="white"
        max-width="720px"
      >
      <v-list >

        <v-list-item
          v-for="user in users"
          :key="user.id"
          :to="{path: '/user/'+ user.id}"
          :avatar="avatar"
          :two-line="twoLine"
        >
          <v-list-item-avatar v-if="user.gender==='male' ? true : false">
            <v-btn class="mx-2" fab dark color="blue lighten-3" small>
              <v-icon dark>mdi-face</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-avatar v-if="user.gender==='female' ? true : false">
            <v-btn class="mx-2" fab dark color="pink lighten-3" small>
              <v-icon dark>mdi-face-woman</v-icon>
            </v-btn>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
            <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>

    <v-divider></v-divider>
      <!-- <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-0"
        :mobile-breakpoint="300"
      ></v-data-table> -->

      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { db } from '@/main';
import moment from 'moment';

export default {
  name: 'users',
  data: () => ({
    // headers: [
    //   { text: 'Full Name', value: 'name', align: 'left' },

    // ],
    users: [],
    avatar: true,
    twoLine: true,

  }),
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      await db.collection('users').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
            this.users.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      });
    },
  },
}
</script>
