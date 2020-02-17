<template>
  <v-container>
      <h1 class="title grey--text text-uppercase">Edit Client</h1>
    <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2" >
        
        <v-snackbar
          v-model="snackbar"
          :timeout="2000"
          bottom
        >
          {{ snackbarText }}
        </v-snackbar>
        <v-row>
          <v-col cols="12">
            <form>
              <v-card outlined >
                <v-card-text>
                  <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="30"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                    color="purple darken-2 purple--text text--lighten-5"
                    :disabled="isDisabled"
                  >
                  <v-icon 
                    slot="prepend" 
                    color="grey"
                  >
                    mdi-account
                  </v-icon>
                </v-text-field>
                <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  class="mb-3"
                  color="purple darken-2 purple--text text--lighten-5"
                  :disabled="isDisabled"
                >
                  <v-icon 
                    slot="prepend" 
                    color="grey"
                  >
                    mdi-email
                  </v-icon>
                </v-text-field>
                <v-row>
                  <v-icon 
                    slot="prepend" 
                    color="grey" 
                    class="mb-4 mr-1 ml-3"
                  >
                   mdi-gender-male-female
                  </v-icon>
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
                      color="purple darken-2 purple--text text--lighten-5"
                    >
                    </v-radio>
                  </v-radio-group>
                </v-row>
                
                <v-switch
                  v-model="active"
                  label="active"
                ></v-switch>

                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="birthdate"
                  persistent
                  width="290px"
                  color="purple darken-2 purple--text text--lighten-5"
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
                      <v-icon 
                        slot="prepend" 
                        color="grey"
                      >
                        mdi-calendar
                      </v-icon>
                    </v-text-field>
                  </template>
                  <v-date-picker 
                    v-model="birthdate" 
                    scrollable 
                    color="purple darken-2 purple--text text--lighten-5"
                  >
                    <v-spacer></v-spacer>
                    <v-btn 
                      text 
                      color="purple darken-2 purple--text text--lighten-5" 
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn 
                      text 
                      color="purple darken-2 purple--text text--lighten-5" 
                      @click="saveDate(birthdate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-card-text>
              <v-card-actions>
                <v-row class="mt-8 mx-auto">
                  <v-btn 
                    @click="update" 
                    depressed 
                    color="purple darken-2 purple--text text--lighten-5" 
                    class="mr-4"
                    :loading="isLoading"
                    :disabled="isDisabled"
                    block
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
              </v-card-actions>
              </v-card>
            </form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
  name: 'EditClient',
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
    active: null,
    checkbox: false,
    birthdate: null,
    isLoading: false,
    menu: false,
    modal: false,
    snackbar: false,
    snackbarText: 'Client successfully updated',
    isDisabled: false,
  }),
  created() {
    this.id = this.$route.params.uid;
    this.getClient();
  },
  methods: {
    async getClient() {
      let client;
      const res = await firebase.firestore()
      .collection('users').doc(this.user.uid)
      .collection("clients")
              .doc(this.id)
              .get()
              console.log(res.data());
              
      client = {...res.data()}
      this.name = client.name;
      this.email = client.email;
      this.defaultGender = client.gender;
      this.birthdate = client.birthdate;
      this.active = client.active;
    },

    async update () {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.isLoading = true;
        await firebase.firestore()
        .collection('users').doc(this.user.uid)
        .collection('clients').doc(this.id).set({
          name: this.name,
          email: this.email,
          gender: this.defaultGender,
          birthdate: this.birthdate,
          active: this.active,
        });
        this.turnDisable();
        this.snackbar = true;
        this.isLoading = false;
      }
      setTimeout(() => {
        this.$router.back()
      }, 1200)
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
    ...mapGetters(['user']),
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

