
<template>
  <v-app-bar
    elevation="0"
  >
    <v-avatar >
      <img src="../assets/logo.png" alt="Logo"/>
    </v-avatar>
    <!-- <v-app-bar-nav-icon @click="cliquearNavIcon()"></v-app-bar-nav-icon> -->
  </v-app-bar>
</template>

<script>

export default {
  methods: {
    cliquearNavIcon() {
      this.$emit('lanzar-nav')
    }
  }
}
</script>
