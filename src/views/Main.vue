<template>
  <v-app>
    <AppBar/>
    <NavegationMain v-bind:drawer="drawers"/>
    <router-view/>
    <v-btn @click="lanzarNavigationMain()">aqui</v-btn>
  </v-app>
</template>

<script>
import NavegationMain from "../components/NavegationMain.vue"
import AppBar from "../components/AppBar.vue"
export default {
  components: {
    NavegationMain,
    AppBar
  },
  
  data: () => ({
    drawers: false,
  }),

  methods: {
    lanzarNavigationMain() {
      this.drawers = !this.drawers
      console.log(this.drawers)
    }
  }
}
</script>
