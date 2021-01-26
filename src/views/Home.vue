<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeForm msg="Welcome to Your Vue.js App"/>
    <div class="store">{{title}}</div>
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
    //let i = 0
    //setInterval(() =>{
    //  this.GET_USERNAME(i % 3);//i repetir 3 veces
    //  i++
    //},1000)
    this.GET_USERID(null)
  },
  methods: {
    ...mapActions([
      'GET_USERID'
    ]),
  }
}
</script>
