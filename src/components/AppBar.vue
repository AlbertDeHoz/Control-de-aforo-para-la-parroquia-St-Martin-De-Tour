<template>
  <v-app-bar
    dense
    elevation="0"
  >
    <v-app-bar-nav-icon @click="cliquearNavIcon()"></v-app-bar-nav-icon>
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
