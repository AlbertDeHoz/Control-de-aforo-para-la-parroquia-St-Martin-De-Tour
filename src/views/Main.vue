<template>
  <v-app>
    <AppBar/>
    <v-row no-gutters class="mx-0 px-0">
      <v-col cols="2">
        <NavegationMain />
      </v-col>
      <v-col cols="10">
        <v-container>
          <router-view />
        </v-container>
      </v-col>
    </v-row>
    <Footer/>
  </v-app>
</template>

<script>
import NavegationMain from "../components/NavegationMain.vue";
import AppBar from "../components/AppBar.vue"
import Footer from "../components/Footer.vue"
export default {
  components: {
    NavegationMain,
    AppBar,
    Footer
  },

  data: () => ({
   
  }),

  methods: {},
};
</script>
