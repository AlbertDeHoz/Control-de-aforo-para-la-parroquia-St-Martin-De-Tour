<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeForm msg="Welcome to Your Vue.js App"/>
    <div class="store">{{title}}</div>
    <div class="store">{{user}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeForm from '@/components/HomeForm.vue'
import {mapGetters} from 'vuex';

export default {
  name: 'Home',
  components: {
    HomeForm
  },
  computed: {
    ...mapGetters(
      ['title','user']
      )
  }
}
</script>
