<template>
  <v-card class="px-7">
    <v-card-title class="mx-auto"><v-spacer/>
      <h1 class="text-h4">LOGIN</h1><v-spacer/>
    </v-card-title>
    <v-form ref="form">
      <v-text-field
        v-model="model"
        :counter="max"
        :rules="rules"
        label="First name"
        class="mb-4 px-4"
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        class="mb-4 px-4"
        required
      ></v-text-field>

      <v-card-actions>
        <v-btn 
          block
          color="primary"
          depressed
        >Ingresar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
};
</script>
