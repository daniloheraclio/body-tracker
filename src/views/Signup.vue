<template>
  <v-container>
     <v-row>
        <v-col cols="12" sm="4" offset-sm="4">
           <v-row>
              <v-col cols="12">
                 <form @submit.prevent="onSignup">
                     <v-card outlined>
                        <v-card-title >
                           <h1 class="title grey--text text-uppercase">
                              Signup
                           </h1>
                        </v-card-title>
                        <v-card-text>
                           <v-text-field
                              v-model="email"
                              :error-messages="emailErrors"
                              @input="$v.email.$touch()"
                              @blur="$v.email.$touch()"
                              type="email"
                              label="Email"
                              required
                              color="purple darken-2 purple--text text--lighten-5"
                           >
                           </v-text-field>
                           <v-text-field
                              v-model="password"
                              :error-messages="passwordErrors"
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              type="password"
                              :rules="[rules.required, rules.min]"
                              autocomplete
                              label="Password"
                              required
                              color="purple darken-2 purple--text text--lighten-5"
                           >
                           </v-text-field>
                           <v-text-field
                              name="confirmPassword"
                              v-model="confirmPassword"
                              :error-messages="confirmPasswordErrors"
                              @input="$v.confirmPassword.$touch()"
                              @blur="$v.confirmPassword.$touch()"
                              type="password"
                              :rules="[rules.comparePassword]"
                              autocomplete
                              label="Confirm Password"
                              required
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
                                 >
                                    Signup
                                 </v-btn>
                                 <v-btn
                                 text
                                 depressed
                                 block
                                 class="mx-auto mt-2"
                                 :to="{path: '/login'}"
                                 >
                                    Login
                              </v-btn>
                              <a right>Forgot password</a>
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
import { fireauth } from '@/main'; 
import { validationMixin } from 'vuelidate';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

export default {
   name: 'signup',
   mixins: [validationMixin],

   data() {
      return {
         email: '',
         password: '',
         confirmPassword: '',
         rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            comparePassword: value => value === this.password || 'Password does not match'
        },
      }
   },
   methods: {
      // FAZER AVISO DE ERRO TOASTER
      onSignup() {
         this.$v.$touch()
         if(!this.$v.$invalid) {
            try {
               this.isValid = false;
               const payload = {
                  email: this.email,
                  password: this.password
               };
               this.$store.dispatch('signupUser', payload);
               this.$router.go({ path: this.$router.path });
            } catch(err) {
               console.log('ERROR: ', err);
               
            }
         }
      }
   },
   computed: {
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
      confirmPasswordErrors () {
         const errors = []
         if (!this.$v.confirmPassword.$dirty) return errors
         !this.$v.confirmPassword.sameAsPassword && errors.push('Password must be identical')
         return errors
      },
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
    confirmPassword: {
      sameAsPassword: sameAs('password'),
    }
  },
}
</script>

<style>

</style>