<template>
  <v-container>

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      bottom
    >
      {{ snackbarText }}
    </v-snackbar>

    <v-row justify="center" v-if="!isDeleted">
      <v-col cols="12" class="danilo">
        <v-row justify="center">
          <v-avatar size="120" class="position">
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
      <v-col cols="12" class="px-0 mx-0">
        <v-card
          class="mx-auto px-0"
          max-width="500"
          flat
          color="red"
        >
          <v-card-subtitle class="pb-0 white--text">{{ user.name }}</v-card-subtitle>

          <v-card-text class="white--text">
            <div>{{ user.gender }}</div>

            <div>{{ user.birthdate }}</div>

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
<style scoped>
.position {
  position: relative;
  width: 100%;
  top: 5em;
  z-index: 500;
  border: inset 10px solid #F44336;
  background: #fff;
}
</style>