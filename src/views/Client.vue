<template>
  <v-container>
    <h1 class="title grey--text text-uppercase">Client</h1>
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
        <v-card
          outlined
        >
          <v-row justify="center">
            <v-avatar size="120" >
              <v-img
                src="@/assets/profile-female-min.png"
                aspect-ratio="1"
                class="transparent"
                max-width="500"
                max-height="300"
              ></v-img>
            </v-avatar>
          </v-row>
          <v-card-title class="pb-0 purple--text">
            {{ client.name }}
          </v-card-title>

          <v-card-text class="purple--text text-uppercase">
            <div>{{ client.gender }}</div>

            <div>{{ client.birthdate }}</div>
            
            <div>{{ age }}</div>

            <div>{{ client.email }}</div>
          </v-card-text>

          <v-card-actions v-if="!isDeleted">
            <v-btn text color="purple--text text--lighten-5"
             :to="{ path: '/clients'}" class="my-4">
             Back
            </v-btn>
            <v-spacer></v-spacer>
            
            <v-btn  text color="purple" :to="{ path: '/editclient/' + id }" class="mr-2">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn text color="red" @click="deleteClient()" class="mr-2">
             <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
            
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8" offset-md="2" >
        <v-btn @click="addTest">
          Add Test
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isDeleted" >
      <h3>{{ messageNotExist }}</h3>
    </v-row>
       
  </v-container>
</template>

<script>
import firebase from 'firebase';
import moment from 'moment';

export default {
  name: 'client',
  props: ['id'],
  data() {
    return {
      // id: this.$route.params.id,
      client: {},
      snackbar: false,
      snackbarText: 'Client has been deleted',
      isDeleted: false,
      messageNotExist: 'Client has been deleted!',
      dialog: false,
    }
  },
  created() {
    this.getClient();
  },
  mounted() {
    console.log(this.client)
  },
  methods: {
    getClient() {
      return firebase.firestore().collection("clients")
                .doc(this.id)
                .onSnapshot(res => {
                  this.client = res.data()
              })
    },
    async deleteClient() {
      if(this.id) {
        this.isDeleted = true;
        await firebase.firestore().collection('clients').doc(this.id).delete();
        
        this.snackbar = true;

        setTimeout(() => {
          this.$router.push({ path: '/clients' })
        }, 2000)
      }
    },
    editClient() {

      this.$router.push({ path: `/editclient/${this.id}`})
      // :to="{ path: '/edituser/' + id }"
    },
    addTest() {
      this.$router.push({ path: `/addTest/${this.id}`})
    },
  },
  computed: {
    age() {
      // TODO: calcular idade
      const today = new Date().toISOString().substr(0, 10)
      return today - this.client.birthdate;
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