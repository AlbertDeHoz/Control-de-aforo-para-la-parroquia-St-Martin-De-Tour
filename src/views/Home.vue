<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeForm msg="Welcome to Your Vue.js App"/>
    <pre>{{userId}}</pre>
  </div>
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
      ['title','userId']
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
