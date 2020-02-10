<template>
  <v-container>
     <v-row>
        <v-col cols="12" sm="4" offset-sm="4">
           <v-row>
              <v-col cols="12">
                 <form @submit="onSubmit">
                     <v-card outlined>
                        <v-card-title >
                           <h1 class="title grey--text text-uppercase">
                              Login
                           </h1>
                        </v-card-title>
                        <v-card-text>
                           <v-text-field
                              v-model="email"
                              type="email"
                              :error-messages="emailErrors"
                              label="Email"
                              required
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                              color="purple darken-2 purple--text text--lighten-5"
                           >
                           </v-text-field>
                           <v-text-field
                              v-model="password"
                              type="password"
                              :error-messages="passwordErrors"
                              label="Password"
                              :rules="[rules.required, rules.min]"
                              required
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              color="purple darken-2 purple--text text--lighten-5"
                           >
                           </v-text-field>
                        </v-card-text>
                        <v-card-actions>
                           <v-row class="mt-8 mx-auto">
                              <v-btn
                                 type="submit"
                                 depressed 
                                 block
                                 color="purple darken-2 purple--text text--lighten-5" 
                                 class="mr-4"
                                 :loading="isLoading"
                                 >
                                    Login
                                 </v-btn>
                                 <v-btn
                                 text
                                 depressed
                                 block
                                 color="purple darken-2 purple--text text--lighten-5"
                                 class="mx-auto mt-2"
                                 :to="{path: '/signup'}"
                                 >
                                    SignUp
                              </v-btn>
                              <a class="grey--text text--darken-2 text-uppercase caption">Forgot password</a>
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
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
   name: 'login',
   mixins: [validationMixin],

   data() {
      return {
         email: '',
         password: '',
         rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
        },
        isLoading: false,
      }
   },
   methods: {
      onSubmit() {
         try {
            const payload = {
               email: this.email,
               password: this.password,
            }
            this.$store.dispatch('login', payload);
         } catch (err) {
            console.log('ERRO: ',err);
         }
      }
   },
   computed: {
      ...mapGetters(['user']),
      emailErrors () {
         const errors = []
         if (!this.$v.email.$dirty) return errors
         !this.$v.email.email && errors.push('Must be valid e-mail')
         !this.$v.email.required && errors.push('E-mail is required')
         return errors
      },
      passwordErrors () { 
         const errors = []
         if (!this.$v.password.$dirty) return errors
         !this.$v.password.minLength && errors.push('Must be valid password')
         !this.$v.password.required && errors.push('Password is required')
         return errors
      },
   },
   watch: {
      user(val) {
         if(val !== null && val !== undefined) {
            this.$router.go({ path: this.$router.path })
         }
      }
   },
   validations: {
    email: { 
      required,
      email, 
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
}
</script>

<style>

</style>