<template>
  <v-app>
    <AppBar/>
    <v-row no-gutters class="mx-0 px-0">
      <v-col cols="3">
        <NavegationMain />
      </v-col>
      <v-col cols="9">
        <v-container>
          <router-view />
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import NavegationMain from "../components/NavegationMain.vue";
import AppBar from "../components/AppBar.vue"
export default {
  components: {
    NavegationMain,
    AppBar
  },

  data: () => ({
    drawers: false,
  }),

  methods: {},
};
</script>
