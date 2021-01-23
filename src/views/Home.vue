<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeForm from '@/components/HomeForm.vue'

export default {
  name: 'Home',
  components: {
    HomeForm
  }
}
</script>
