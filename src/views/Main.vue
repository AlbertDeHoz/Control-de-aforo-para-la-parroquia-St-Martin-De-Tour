<template>
  <v-app>
    <AppBar @lanzar-nav="lanzarNavigationMain()"/>
    <NavegationMain :drawer="drawers" @transition-end="drawers=false"/>
    <router-view/>
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
