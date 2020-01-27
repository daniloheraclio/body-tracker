<template>
<v-container>
  <v-row no-gutters>
    <v-col cols="12" >
      <v-sheet
        class="mx-auto py-0 px-1"
        max-width="720px"
        > 
        <v-snackbar
          v-model="snackbar"
          :timeout="2000"
          bottom
        >
          {{ snackbarText }}
        </v-snackbar>
        <p class="display-1 grey--text text--darken-2">
          <v-icon large color="grey darken-2" class="mb-2 mr-2">
            mdi-account-plus
          </v-icon>
          Create Test
        </p>
      </v-sheet>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="6" >
      <v-sheet
        class="mx-auto pa-0"
        color="white"
        max-width="720px"
      >
        <Form7site @sum-skinfold="danilo(data)"/>
      </v-sheet>
    </v-col>

    <v-col cols="12" md="6">
      <v-sheet
        class="mx-auto pa-0"
        color="white"
        max-width="720px"
      >
        <form>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="testdate"
            persistent
            width="290px"
            color="deep-orange"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="testdate"
                readonly
                v-on="on"
                placeholder="Test Date"
                required
                @input="$v.testdate.$touch()"
                @blur="$v.testdate.$touch()"
                :error-messages="testdateErrors"
                :disabled="isDisabled"
              >
                <v-icon slot="prepend" color="deep-orange">mdi-calendar</v-icon>
              </v-text-field>
            </template>
            <v-date-picker v-model="testdate" scrollable color="deep-orange" >
              <v-spacer></v-spacer>
              <v-btn text color="blue-grey darken-1" @click="modal = false">Cancel</v-btn>
              <v-btn text color="blue-grey darken-1" @click="saveDate(testdate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        
          <v-row class="mt-8 mx-auto">
            <v-btn 
              @click="submit" 
              depressed 
              color="blue-grey white--text" 
              class="mr-4"
              :loading="isLoading"
              :disabled="isDisabled"
            >
              submit
            </v-btn>
            <v-btn
            text
              @click="clear" 
              depressed
            >
              clear
            </v-btn>
          </v-row>
        </form>
      </v-sheet>
    </v-col>

  </v-row>  
</v-container>
</template>

<script>
import Form7site from '../components/Form7site';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';
import { pollockMale7skinfold } from '../fitTests/skinfold';
import { log } from 'util';

export default {
  name: 'CreateTest',
  mixins: [validationMixin],
  components: {
    Form7site,
  },
  data: () => ({
    name: '',
    email: '',
    defaultGender: null,
    checkbox: false,
    testdate: null,
    isLoading: false,
    menu: false,
    modal: false,
    snackbar: false,
    snackbarText: 'User successfully added',
    isDisabled: false,
    sumSkinfold: null,
  }),
  mounted() {
    console.log(pollockMale7skinfold(70,38))
  },
  methods: {
    danilo(data){
      this.sumSkinfold = data;
    },
    async submit () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.isLoading = true;
        console.log(this.sumSkinfold)
        // await firebase.firestore().collection('users').add({
        //   name: this.name,
        //   email: this.email,
        //   gender: this.defaultGender,
        //   testdate: this.testdate,
        // });
        this.turnDisable();
        this.snackbar = true
        this.isLoading = false;
      // setTimeout(() => {
      //   this.$router.push({ path: '/users' })
      // }, 2000)
      }
    },
    turnDisable() {
      this.isDisabled = true
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.defaultGender = null
      this.testdate = null
    },
    saveDate(testdate) {
      this.$refs.dialog.save(testdate);
      this.modal = false;
    },
  },
  computed: {
    testdateErrors () {
      const errors = []
      if (!this.$v.testdate.$dirty) return errors
      !this.$v.testdate.required && errors.push('Testdate is required.')
      return errors
    },
  },
  validations: {
    testdate: { required },
  },
}
</script>

<style>

</style>