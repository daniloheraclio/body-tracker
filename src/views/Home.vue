<template>
  <v-container>
    <h1 class="title grey--text text-uppercase">Dashboard</h1>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>
      <!-- Banner card -->
      <v-col
        cols="12"
        md="8"
      >
        <v-row no-gutters>
          <v-col cols="12">
            <v-card
              class="pa-2"
              min-height="150"
              outlined
            >
              <v-card-title>
                Banner
              </v-card-title>
              <v-card-text>
                Aqui coloca um banner com uma imagem pra deixar bonito =)
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- 2 small categories tests cards -->
        <v-row class="mt-2">
          <v-col
            cols="6"
            md="6"
            v-for="test in tests"
            :key="test.url"
          >
            <v-card
              class="pa-0"
              min-height="150"
              outlined
            >
              <v-img
                :src="test.url"
                height="215"
                class="white--text align-center text-center text-uppercase"
              >
                <v-list-item-subtitle>{{ test.title }}</v-list-item-subtitle>
              </v-img>
            </v-card>
         </v-col>
        </v-row>
      </v-col>
      <!-- random list users limited to 4 -->
      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="pa-2"
          min-height="150"
          outlined
        >
          <v-card-title>
            Clients
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="user in users"
                :key="user.name"
                :to="{path: '/user/'+ user.id}"
              >
                <v-list-item-avatar>
                  <v-img :src="user.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="user.name"></v-list-item-title>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn block depressed :to="{ path: '/users' }">
              <v-icon color="grey darken-2" class="mb-1 mr-3">
                mdi-account-group
              </v-icon>
              All Clients
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="6"
        md="4"
      >
        <v-card
          class="pa-2"
          min-height="150"
          outlined
        >
          .col-6 .col-md-4
        </v-card>
      </v-col>
    </v-row>

    <!-- Columns are always 50% wide, on mobile and desktop -->
    <v-row>
      <v-col
        v-for="n in 2"
        :key="n"
        cols="6"
      >
        <v-card
          class="pa-2"
          outlined
        >
          .col-6
        </v-card>
      </v-col>
    </v-row>
    <v-card flat class="pa-3">
      <v-layout row wrap>

      </v-layout>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: 'home',
  components: {
  },
  data: () => ({
    users: [
      {avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', name: 'Danilo Heraclio', dob: '1981-03-24', gender: 'male'},
      {avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', name: 'Alana Moraes', dob: '1987-05-30', gender: 'female'},
      {avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', name: 'Luana Moraes', dob: '2015-04-30', gender: 'female'},
      {avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', name: 'Sophia Heraclio', dob: '2019-11-12', gender: 'female'},
    ],
    tests: [
      {title: 'Aerobic', url: 'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Running/620/What+is+Maximalist+Running+620.jpg'},
      {title: 'Body composition', url: 'https://gymjp.com/wp-content/uploads/2014/09/trackskinfold.jpg'},
    ]
  }),
  methods: {
    openUser(user) {
      console.log(user);
      
    },
  }

}
</script>
