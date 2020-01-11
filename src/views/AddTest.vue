<template>
    <v-row no-gutters>
      <v-col>
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
        <v-sheet
          class="mx-auto pa-0"
          color="white"
          max-width="720px"
        >
          <form>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="30"
              label="Name"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              color="blue-grey darken-1"
              :disabled="isDisabled"
            >
              <v-icon slot="prepend" color="deep-orange">mdi-account</v-icon>
            </v-text-field>
            
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
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import { db } from '@/main';

export default {
  name: 'CreateTest',
  mixins: [validationMixin],

  data: () => ({
    name: '',
    email: '',
    defaultGender: null,
    genders: [
      {label: 'Male',   value: 'male'},
      {label: 'Female', value: 'female'}
    ],
    checkbox: false,
    testdate: null,
    isLoading: false,
    menu: false,
    modal: false,
    snackbar: false,
    snackbarText: 'User successfully added',
    isDisabled: false,
  }),

  methods: {
    async submit () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.isLoading = true;
        await db.collection('users').add({
          name: this.name,
          email: this.email,
          gender: this.defaultGender,
          testdate: this.testdate,
        });
        this.turnDisable();
        this.snackbar = true
        this.isLoading = false;
      setTimeout(() => {
        this.$router.push({ path: '/users' })
      }, 2000)
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
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    genderErrors () {
      const errors = []
      if (!this.$v.defaultGender.$dirty) return errors
      !this.$v.defaultGender.required && errors.push('Item is required')
      return errors
    },
    testdateErrors () {
      const errors = []
      if (!this.$v.testdate.$dirty) return errors
      !this.$v.testdate.required && errors.push('Testdate is required.')
      return errors
    },
  },
  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    defaultGender: { required },
    testdate: { required },
  },
}
</script>

<style>

</style>