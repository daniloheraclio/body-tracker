<template>
  <v-container>
    <h1 class="title grey--text text-uppercase">Clients</h1>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2" >
        <v-card 
          outlined
        >
          <v-list>

            <v-list-item
              v-for="client in clients"
              :key="client.id"
              :to="{path: '/client/'+ client.id}"
              :avatar="avatar"
              :two-line="twoLine"
            >
              <v-list-item-avatar v-if="client.gender==='male'">
                <v-btn class="mx-2" fab dark color="blue lighten-3" small>
                  <v-icon dark>mdi-face</v-icon>
                </v-btn>
              </v-list-item-avatar>

              <v-list-item-avatar v-if="client.gender==='female'">
                <v-btn class="mx-2" fab dark color="pink lighten-3" small>
                  <v-icon dark>mdi-face-woman</v-icon>
                </v-btn>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="client.name"></v-list-item-title>
                <v-list-item-subtitle v-text="client.email"></v-list-item-subtitle>
              </v-list-item-content>

            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'clients',
  data: () => ({
    clients: [],
    avatar: true,
    twoLine: true,

  }),
  created() {
    this.getUsers();
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    async getUsers() {
      await firebase.firestore()
      .collection('users').doc(this.user.uid)
      .collection('clients').onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if(change.type === 'added') {
            this.clients.push({
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
