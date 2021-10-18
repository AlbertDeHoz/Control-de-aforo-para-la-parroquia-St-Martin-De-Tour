<template>
  <v-app>
    <v-container class="mt-7">
      <v-row no-gutters justify="center">
        <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        
        >
          <login-form v-on:handle_submit-registrar="submitRegistrar"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import LoginForm from "../components/Login.Form.vue";
export default {
  components: {
    LoginForm,
  },
  methods: {
    submitRegistrar(registrar){
      console.log(registrar)
    }
  }
};
</script>
