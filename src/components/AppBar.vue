<template>
  <v-app-bar
    dense
  >
    <v-app-bar-nav-icon @click="cliquearNavIcon()"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script>

export default {
  methods: {
    cliquearNavIcon() {
      console.log('hello')
    }
  }
}
</script>
