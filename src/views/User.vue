<template>
<v-container>
    <h1 class="title grey--text text-uppercase">My Account</h1>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    

    <v-row >
      <v-col cols="12" md="8" offset-md="2">
        <v-card
        v-if="isLogged"
          outlined
        >
          <v-row justify="center">
            <v-avatar size="120" >
              <v-img
                src="@/assets/profile-male-min.png"
                aspect-ratio="1"
                class="transparent"
                max-width="500"
                max-height="300"
              ></v-img>
            </v-avatar>
          </v-row>
          <v-card-title class="pb-0 purple--text">
            Nome
          </v-card-title>

          <v-card-text class="purple--text text-uppercase">
            <div>CREF</div>

            <div>Gender</div>

            <div>Birthday</div>
            
            <div>Idade</div>

            <div>{{ userInfo.email }} </div>

            <div>{{ dateLastLoginFormated }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="logout" block color="purple" dark elevation="0">
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>
       
  </v-container>
</template>
<script>
import firebase from 'firebase';
import moment from 'moment';
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'user',
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
    userInfo() {
      if(this.isLogged) {
        return {
          name: this.user.name,
          email: this.user.email,
        }
      }
      return
    },
    dateLastLoginFormated() {
      return moment(this.user.lastloginat).format('lll')
    },
  },
}
</script>