<template>

    <v-app class="div__app">
    <HomeForm/>
    </v-app>
</template>

<script>
// @ is an alias to /src
import HomeForm from '@/components/HomeForm.vue'

export default {
  name: 'Home',
  components: {
    HomeForm
  },
  computed: {

  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style>
.div__app {
  background: url('../assets/cross.jpg')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>