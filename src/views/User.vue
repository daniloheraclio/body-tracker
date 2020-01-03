<template>
  <v-container>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      bottom
    >
      {{ snackbarText }}
    </v-snackbar>

    <v-row>
      <h1>User</h1>
    </v-row>

    <v-row v-if="!isDeleted" >
      <ul>
        <li>{{ user.name }}</li>
        <li>{{ user.gender }}</li>
        <li>{{ user.birthdate }}</li>
        <li>{{ user.email }}</li>
      </ul>
    </v-row>
    <v-row v-if="isDeleted" >
      <h3>{{ messageNotExist }}</h3>
    </v-row>
    <v-row>
      <v-btn v-if="!isDeleted" block color="blue-grey darken-1" :to="{ path: '/users'}" class="my-4">Back</v-btn>
      <v-btn v-if="!isDeleted" outlined color="error" @click="deleteUser()" class="mr-2">Delete User</v-btn>
      <v-btn v-if="!isDeleted" outlined color="warning" :to="{ path: '/edituser/' + id }" class="mr-2">Edit User</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { db } from '@/main';

export default {
  name: 'user',
  data() {
    return {
      id: this.$route.params.id,
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
      return db.collection("users")
                .doc(this.id)
                .onSnapshot(res => {
                  this.user = res.data()
              })
    },

    async deleteUser() {
      if(this.id) {
        this.isDeleted = true;
        await db.collection('users').doc(this.id).delete();
        
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
}
</script>
