<template>
  <v-container class="grey lighten-5">
    <v-row justify="center">
      <v-col cols="12">
        <form @submit.prevent="foldData">
         <v-text-field
            v-model="triceps"
            :error-messages="tricepsErrors"
            :counter="5"
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
            :counter="5"
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
            :counter="5"
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
            :counter="5"
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
            :counter="5"
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
            :counter="5"
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
            :counter="5"
            label="Thigh"
            required
            @input="$v.thigh.$touch()"
            @blur="$v.thigh.$touch()"
            color="blue-grey darken-1"
            :disabled="isDisabled"
         >
         </v-text-field>

        </form>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
   name: 'Form7site',
   mixins: [validationMixin],
   data: () => ({
      triceps: null,
      subscapular: null,
      chest : null,
      axilla : null,
      suprailiac : null,
      abdominal : null,
      thigh : null,
      sumSkinfold: 0,
      isDisabled: false,
   }),
   methods: {
      foldData() {
         console.log(this.triceps +
                  this.subscapular +
                  this.chest +
                  this.axilla +
                  this.suprailiac +
                  this.abdominal +
                  this.thigh);
      }
   },
   computed: {
      foldData() {
         this.$emit('sum-skinfold', )
      },
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
      skinfolds() {
         this.sumSkinfold =   this.triceps +
                  this.subscapular +
                  this.chest +
                  this.axilla +
                  this.suprailiac +
                  this.abdominal +
                  this.thigh;
      },
   },
   watch: {
      triceps(val) {
         console.log(val)
         this.$v.$touch();
         
         this.$emit('sum-skinfold', val)
      },

      clear () {
        this.$v.$reset();
        this.triceps     = null;
        this.subscapular = null;
        this.chest       = null;
        this.axilla      = null;
        this.suprailiac  = null;
        this.abdominal   = null;
        this.thigh       = null;
      },
   },
   validations: {
      triceps:     { required, maxLength: maxLength(5) },
      subscapular: { required, maxLength: maxLength(5) },
      chest:       { required, maxLength: maxLength(5) },
      axilla:      { required, maxLength: maxLength(5) },
      suprailiac:  { required, maxLength: maxLength(5) },
      abdominal:   { required, maxLength: maxLength(5) },
      thigh:       { required, maxLength: maxLength(5) },
   },
}
</script>
