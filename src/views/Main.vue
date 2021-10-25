<template>
  <v-app>
    <NavegationMain/>
    <router-view/>
  </v-app>
</template>

<script>
  import NavegationMain from "../components/NavegationMain.vue"
  export default {
    components: {
      NavegationMain
    }
  }
</script>
