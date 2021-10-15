<template>
  <v-app>
    <v-container>
      <v-row no-gutters>
        <v-col>
          <login-form />
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
};
</script>
