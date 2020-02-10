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
              <v-card-title>
                <v-icon
                  x-large
                  color="purple"
                  class="mx-auto mt-2"
                >
                  {{ test.src }}
                </v-icon>
              </v-card-title>
              
              <v-card-subtitle class="d-flex justify-center">
               <p class="subtitle-2 text-uppercase grey--text text--darken-1 mt-4" >{{ test.title }}</p>
              </v-card-subtitle>
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
                v-for="client in clientsPreview"
                :key="client.name"
                :to="{path: '/client/'+ client.id}"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="client.name"></v-list-item-title>
                </v-list-item-content>

              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn block depressed :to="{ path: '/clients' }">
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
        v-for="n in 4"
        :key="n"
        cols="6"
        md="3"
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
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'home',
  props: ['id'],
  components: {
  },
  data: () => ({
    tests: [
      {title: 'Aerobic', src: 'mdi-run'},
      {title: 'Body composition', src: 'mdi-scale-bathroom'},
    ]
  }),
  created() {
    this.getClients();
  },
  computed: {
    ...mapGetters(['clientsPreview']),
  },
  methods: {
    ...mapActions(['getClients']),
  }
}
</script>
