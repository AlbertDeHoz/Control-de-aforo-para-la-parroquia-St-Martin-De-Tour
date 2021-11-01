<template>
  <v-app-bar elevation="0">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon
          class="burger-menu"
          color="primary"
          dark
          v-on="on"
        ></v-app-bar-nav-icon>
      </template>
      <NavegationMain/>
    </v-menu>
    <v-avatar>
      <img src="../assets/logo.png" alt="Logo" />
    </v-avatar>
  </v-app-bar>
</template>

<script>
import NavegationMain from "./NavegationMain.vue";

export default {
  components: {
    NavegationMain,
  },

  methods: {
    cliquearNavIcon() {
      this.$emit("lanzar-nav");
    },
  },
};
</script>

<style scoped>
@media screen and (min-width: 960px) {
  .burger-menu {
    display: none;
  }
}
</style>
