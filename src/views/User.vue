<template>
  <v-container>
    <h1 class="title grey--text text-uppercase">Clients</h1>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      bottom
    >
      {{ snackbarText }}
    </v-snackbar>

    <v-row v-if="!isDeleted">
      <v-col cols="12" md="8" offset-md="2">
        <v-row justify="center">
          <v-avatar size="120" >
            <v-img
              src="@/assets/profile-female-min.png"
              lazy-src="https://picsum.photos/id/11/10/1"
              aspect-ratio="1"
              class="transparent"
              max-width="500"
              max-height="300"
            ></v-img>
          </v-avatar>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <v-card
          max-width="500"
          outlined
          color="white"
        >
          <v-card-title class="pb-0 purple--text">
            {{ user.name }}
          </v-card-title>

          <v-card-text class="purple--text text-uppercase">
            <div>{{ user.gender }}</div>

            <div>{{ user.birthdate }}</div>
            
            <div>{{ age }}</div>

            <div>{{ user.email }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn v-if="!isDeleted" text color="orange" @click="deleteUser()" class="mr-2">
              Delete User
            </v-btn>

            <v-btn v-if="!isDeleted" text color="orange" :to="{ path: '/edituser/' + id }" class="mr-2">
              Edit User
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>
    <v-row v-if="isDeleted" >
      <h3>{{ messageNotExist }}</h3>
    </v-row>
    <v-row>
      <v-btn v-if="!isDeleted" block color="blue-grey darken-1 white--text" :to="{ path: '/users'}" class="my-4">Back</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import moment from 'moment';

export default {
  name: 'user',
  props: ['id'],
  data() {
    return {
      // id: this.$route.params.id,
      user: {},
      snackbar: false,
      snackbarText: 'User has been deleted',
      isDeleted: false,
      messageNotExist: 'No user found!',
      dialog: false,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      return firebase.firestore().collection("users")
                .doc(this.id)
                .onSnapshot(res => {
                  this.user = res.data()
              })
    },

    async deleteUser() {
      if(this.id) {
        this.isDeleted = true;
        await firebase.firestore().collection('users').doc(this.id).delete();
        
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push({ path: '/users' })
        }, 2000)
      }
    },

    editUser() {

      this.$router.push({ path: `/edituser/${this.id}`})
      // :to="{ path: '/edituser/' + id }"
    }
  },
  computed: {
    age() {
      // TODO: calcular idade
      const today = new Date().toISOString().substr(0, 10)
      return today - this.user.birthdate;
    }
  }
}
</script>
<style scoped>
.position {
  position: relative;
  width: 100%;
  top: 5em;
  z-index: 2;
  border: inset 10px solid #F44336;
  background: #fff;
}
</style>