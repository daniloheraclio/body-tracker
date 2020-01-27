<template>
  <v-row no-gutters>
    <v-col class="mx-auto">
      <v-sheet
        class="mx-auto pa-4"
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
          Edit User
        </p>
      </v-sheet>
      <v-sheet
        class="mx-auto pa-4"
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
            <v-icon slot="prepend" color="deep-orange darken-2">mdi-account</v-icon>
          </v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            class="mb-3"
            color="blue-grey darken-1"
            :disabled="isDisabled"
          >
            <v-icon slot="prepend" color="deep-orange darken-2">mdi-email</v-icon>
          </v-text-field>
          <v-row>
            <v-icon slot="prepend" color="deep-orange darken-2" class="mb-4 mr-1 ml-3">mdi-gender-male-female</v-icon>
            <v-radio-group 
              v-model="defaultGender"
              column 
              v-for="gender in genders" 
              :key="gender.value"
              class="mt-1 ml-1"
              required
              :error-messages="genderErrors"
              :disabled="isDisabled"
            >
              <v-radio 
                :label="gender.label" 
                :value="gender.value"
                color="blue-grey darken-1"
              >
              </v-radio>
            </v-radio-group>
          </v-row>
          
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="birthdate"
            persistent
            width="290px"
            color="deep-orange darken-2"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="birthdate"
                readonly
                v-on="on"
                placeholder="Birthday"
                required
                @input="$v.birthdate.$touch()"
                @blur="$v.birthdate.$touch()"
                :error-messages="birthdateErrors"
                :disabled="isDisabled"
              >
                <v-icon slot="prepend" color="deep-orange darken-2">mdi-calendar</v-icon>
              </v-text-field>
            </template>
            <v-date-picker v-model="birthdate" scrollable color="deep-orange darken-2" >
              <v-spacer></v-spacer>
              <v-btn text color="blue-grey darken-1" @click="modal = false">Cancel</v-btn>
              <v-btn text color="blue-grey darken-1" @click="saveDate(birthdate)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-row class="mt-8">
            <v-btn 
              @click="update" 
              depressed 
              color="blue-grey white--text" 
              class="mr-4"
              :loading="isLoading"
              :disabled="isDisabled"
            >
              update
          </v-btn>
            <v-btn 
              @click="back" 
              text
            >
              back
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
import firebase from 'firebase';

export default {
  name: 'EditUser',
  mixins: [validationMixin],

  data: () => ({
    id: null,
    name: '',
    email: '',
    defaultGender: null,
    genders: [
      {label: 'Male',   value: 'male'},
      {label: 'Female', value: 'female'}
    ],
    checkbox: false,
    birthdate: null,
    isLoading: false,
    menu: false,
    modal: false,
    snackbar: false,
    snackbarText: 'User successfully updated',
    isDisabled: false,
  }),
  created() {
    this.id = this.$route.params.uid;
    this.getUser();
  },
  methods: {
    async getUser() {
      let user;
      const res = await firebase.firestore().collection("users")
              .doc(this.id)
              .get()
      user = {...res.data()}
      this.name = user.name;
      this.email = user.email;
      this.defaultGender = user.gender;
      this.birthdate = user.birthdate;
    },

    async update () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.isLoading = true;
        await firebase.firestore().collection('users').doc(this.id).set({
          name: this.name,
          email: this.email,
          gender: this.defaultGender,
          birthdate: this.birthdate,
        });
        this.turnDisable();
        this.snackbar = true;
        this.isLoading = false;
      }
      setTimeout(() => {
        this.$router.push({ path: '/users' })
      }, 2000)
    },
    back() {
      this.$v.$reset()
      this.$router.go(-1)
    },
    turnDisable() {
      this.isDisabled = true
    },
    saveDate(birthdate) {
      this.$refs.dialog.save(birthdate);
      this.modal = false;
    },
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    genderErrors() {
      const errors = []
      if (!this.$v.defaultGender.$dirty) return errors
      !this.$v.defaultGender.required && errors.push('Item is required')
      return errors
    },
    birthdateErrors() {
      const errors = []
      if (!this.$v.birthdate.$dirty) return errors
      !this.$v.birthdate.required && errors.push('Birthday is required.')
      return errors
    },
  },

  validations: {
    name: { required, maxLength: maxLength(30) },
    email: { required, email },
    defaultGender: { required },
    birthdate: { required },
  },
}

/**
 * TODO:
 * 1 - Replace clear btn for back btn
 * 2 - Change rout to when update go to user info
 */


</script>

