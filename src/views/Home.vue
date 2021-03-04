<template>
  <v-app >
    <div class="mx-auto">
    <img alt="Vue logo" width="400px" src="../assets/logo.jpg">
    </div>
    <HomeForm />
  </v-app>
</template>

<script>
// @ is an alias to /src
import HomeForm from '@/components/HomeForm.vue'
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  components: {
    HomeForm
  },
  computed: {
    ...mapGetters(
      ['userId']
      )
  },
  mounted() {
    //this.KEEP_USERID(null)
  },
  methods: {
    ...mapActions([
      'KEEP_USERID'
    ]),
  }
}
</script>

<style scoped>

</style>