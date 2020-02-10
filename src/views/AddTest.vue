<template>
  <v-container>
    <h1 class="title grey--text text-uppercase">Add Test</h1>
      <!-- Stack the columns on mobile by making one full-width and the other half-width -->
    <v-snackbar v-model="snackbar" :timeout="1500" bottom>{{ snackbarText }}</v-snackbar>
    <v-row>
        <v-col cols="12" md="6" >
          <v-card class="pa-2" outlined >
            <v-text-field
            v-model="triceps"
            :error-messages="tricepsErrors"
            :counter="4"
            label="Triceps"
            required
            @input="$v.triceps.$touch()"
            @blur="$v.triceps.$touch()"
            color="blue-grey darken-1"
            :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="subscapular"
                :error-messages="subscapularErrors"
                :counter="4"
                label="Subscapular"
                required
                @input="$v.subscapular.$touch()"
                @blur="$v.subscapular.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="chest"
                :error-messages="chestErrors"
                :counter="4"
                label="Chest"
                required
                @input="$v.chest.$touch()"
                @blur="$v.chest.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="axilla"
                :error-messages="axillaErrors"
                :counter="4"
                label="Axilla"
                required
                @input="$v.axilla.$touch()"
                @blur="$v.axilla.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="suprailiac"
                :error-messages="suprailiacErrors"
                :counter="4"
                label="Suprailiac"
                required
                @input="$v.suprailiac.$touch()"
                @blur="$v.suprailiac.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="abdominal"
                :error-messages="abdominalErrors"
                :counter="4"
                label="Abdominal"
                required
                @input="$v.abdominal.$touch()"
                @blur="$v.abdominal.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>

            <v-text-field
                v-model="thigh"
                :error-messages="thighErrors"
                :counter="4"
                label="Thigh"
                required
                @input="$v.thigh.$touch()"
                @blur="$v.thigh.$touch()"
                color="blue-grey darken-1"
                :disabled="isDisabled"
            >
            </v-text-field>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" >
          <v-card class="pa-2" outlined >
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
            <v-text-field
              v-model="weight"
              :error-messages="weightErrors"
              :counter="5"
              label="Weight"
              required
              @input="$v.weight.$touch()"
              @blur="$v.weight.$touch()"
              color="blue-grey darken-1"
              :disabled="isDisabled"
            >
            </v-text-field>
            <v-text-field
              v-model="desiredWeight"
              :error-messages="desiredWeightErrors"
              :counter="5"
              label="Desired Weight"
              required
              @input="$v.desiredWeight.$touch()"
              @blur="$v.desiredWeight.$touch()"
              color="blue-grey darken-1"
              :disabled="isDisabled"
            >
            </v-text-field>
            <v-text-field
              v-model="heigth"
              :error-messages="heigthErrors"
              :counter="5"
              label="Heigth"
              required
              @input="$v.heigth.$touch()"
              @blur="$v.heigth.$touch()"
              color="blue-grey darken-1"
              :disabled="isDisabled"
            >
            </v-text-field>
          </v-card>
        </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import firebase from 'firebase';
import { pollockMale7skinfold, pollockFemale7skinfold } from '../fitTests/skinfold';

export default {
  name: 'CreateTest',
  mixins: [validationMixin],
  props: ['id'],
  data: () => ({
    client: {},
    // name: '',
    // email: '',
    gender: null,
    checkbox: false,
    isLoading: false,
    menu: false,
    modal: false,
    snackbar: false,
    snackbarText: 'User successfully added',
    isDisabled: false,
    triceps: null,
    subscapular: null,
    chest: null,
    axilla: null,
    suprailiac: null,
    abdominal: null,
    thigh: null,
    testdate: null,
    weight: null,
    desiredWeight: null,
    heigth: null,
  }),
  created() {
    this.getClient();
  },
  methods: {
    getClient() {
      return firebase.firestore().collection("clients")
                .doc(this.id)
                .onSnapshot(res => {
                  this.client = res.data()
              });
    },
    async submit () {
      // this.$v.$touch()
      // if(!this.$v.$invalid) {
        this.isLoading = true;
        // Transfor to float
        const triceps = parseFloat(this.triceps);
        const subscapular = parseFloat(this.subscapular);
        const chest = parseFloat(this.chest);
        const axilla = parseFloat(this.axilla);
        const suprailiac = parseFloat(this.suprailiac);
        const abdominal = parseFloat(this.abdominal);
        const thigh = parseFloat(this.thigh);
        const weight = parseFloat(this.weight);
        const desiredWeight = parseFloat(this.desiredWeight);
        const heigth = parseFloat(this.heigth);

        // Sum of all skin folds
        const sumSkinFolds = 
          triceps + 
          subscapular + 
          chest + 
          axilla + 
          suprailiac +
          abdominal + 
          thigh;

        // build payload to send to firebase
        const payload = {
          triceps,
          subscapular,
          chest,
          axilla,
          suprailiac,
          abdominal,
          thigh,
          testDate: this.testdate,
          weight,
          desiredWeight,
          heigth,
          // client id
          // user id
        }
        
        /*
          Preciso colocar o client ID no payload da avaliacao e acho qu tbm o do Prof (user)
          Preciso calcular a idade que ta hardcoded aqui em baixo
          Preciso validar pra so acietar numeros (float)
          Preciso enviar pro firebase collection evaluations

        */
        const percentage = this.getPercetage(this.client.gender, sumSkinFolds, 30);

        console.log(this.client)
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
      // }
    },
    getPercetage(gender, sos, age) {
      if(gender === 'male' ) {
        return pollockMale7skinfold(sos, age);
      } else {
        return pollockfemale7skinfold(sos, age);
      };
    },
    turnDisable() {
      this.isDisabled = true
    },
    saveDate(testdate) {
      this.$refs.dialog.save(testdate);
      this.modal = false;
    },
  },
  computed: {
    tricepsErrors() {
      const errors = []
      if (!this.$v.triceps.$dirty) return errors
      !this.$v.triceps.maxLength && errors.push('Triceps must be at most 5 characters long')
      !this.$v.triceps.required && errors.push('Triceps is required.')
      return errors
    },
    subscapularErrors() {
      const errors = []
      if (!this.$v.subscapular.$dirty) return errors
      !this.$v.subscapular.maxLength && errors.push('Subscapular must be at most 5 characters long')
      !this.$v.subscapular.required && errors.push('Subscapular is required.')
      return errors
    },
    chestErrors() {
      const errors = []
      if (!this.$v.chest.$dirty) return errors
      !this.$v.chest.maxLength && errors.push('Chest must be at most 5 characters long')
      !this.$v.chest.required && errors.push('Chest is required.')
      return errors
    },
    axillaErrors() {
      const errors = []
      if (!this.$v.axilla.$dirty) return errors
      !this.$v.axilla.maxLength && errors.push('Axilla must be at most 5 characters long')
      !this.$v.axilla.required && errors.push('Axilla is required.')
      return errors
    },
    suprailiacErrors() {
      const errors = []
      if (!this.$v.suprailiac.$dirty) return errors
      !this.$v.suprailiac.maxLength && errors.push('Suprailiac must be at most 5 characters long')
      !this.$v.suprailiac.required && errors.push('Suprailiac is required.')
      return errors
    },
    abdominalErrors() {
      const errors = []
      if (!this.$v.abdominal.$dirty) return errors
      !this.$v.abdominal.maxLength && errors.push('Abdominal must be at most 5 characters long')
      !this.$v.abdominal.required && errors.push('Abdominal is required.')
      return errors
    },
    thighErrors() {
      const errors = []
      if (!this.$v.thigh.$dirty) return errors
      !this.$v.thigh.maxLength && errors.push('Thigh must be at most 5 characters long')
      !this.$v.thigh.required && errors.push('Thigh is required.')
      return errors
    },
    testdateErrors () {
      const errors = []
      if (!this.$v.testdate.$dirty) return errors
      !this.$v.testdate.required && errors.push('Testdate is required.')
      return errors
    },
    weightErrors() {
      const errors = []
      if (!this.$v.weight.$dirty) return errors
      !this.$v.weight.maxLength && errors.push('Weight must be at most 5 characters long')
      !this.$v.weight.required && errors.push('Weight is required.')
      return errors
    },
    desiredWeightErrors() {
      const errors = []
      if (!this.$v.desiredWeight.$dirty) return errors
      !this.$v.desiredWeight.maxLength && errors.push('Desired weight must be at most 5 characters long')
      !this.$v.desiredWeight.required && errors.push('Desired weight is required.')
      return errors
    },
    heigthErrors() {
      const errors = []
      if (!this.$v.heigth.$dirty) return errors
      !this.$v.heigth.maxLength && errors.push('Heigth must be at most 5 characters long')
      !this.$v.heigth.required && errors.push('Heigth is required.')
      return errors
    },
  },
  validations: {
    triceps:      { required, maxLength: maxLength(4) },
    subscapular:  { required, maxLength: maxLength(4) },
    chest:        { required, maxLength: maxLength(4) },
    axilla:       { required, maxLength: maxLength(4) },
    suprailiac:   { required, maxLength: maxLength(4) },
    abdominal:    { required, maxLength: maxLength(4) },
    thigh:        { required, maxLength: maxLength(4) },
    testdate:     { required },
    weight:       { required, maxLength: maxLength(5) },
    desiredWeight:{ required, maxLength: maxLength(5) },
    heigth:       { required, maxLength: maxLength(5) },
  },
}
</script>

<style>

</style>