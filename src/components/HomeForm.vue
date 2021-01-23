<template>
  <v-app>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
      <v-select
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-text-field
        v-model="email"
        :rules="idRules"
        label="Cédula"
        @keypress="isNumber($event)"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
  </v-container>
  </v-app>
</template>

<script>
  export default {
    name:'HomeForm',
    data: () => ({
      valid: true,
     
      id: '',
      idRules: [
        v => !!v || 'Id is required',
        v => (v && v.length >= 5) || 'Name must be more than 4 characters'
        //v => /.+@.+\..+/.test(v) || 'id must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          evt.preventDefault();
        } else {
          return true;
        }
      },

      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },

    },
  }
</script>
