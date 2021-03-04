<template>
    <v-app>
    <v-container>
    <v-menu
        ref="menu"   
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
        lazy-validation
    >
        <template v-slot:activator="{ on, attrs }">
        <v-form>
        <v-text-field
            v-model="date"
            label="Birthday date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            :rules="dateRules"
        ></v-text-field>
        <v-btn
        :disabled="date===null?true:false"
        @click="verify"
        >
          Enviar
        </v-btn>
        </v-form>
        </template>
        <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
        ></v-date-picker>
    </v-menu>
    <pre>{{date}}</pre>
    <pre>{{userId}}</pre>
    </v-container>
    </v-app>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

  export default {
    data: () => ({
      date: null,
      menu: false,
      dateRules: [
        v => !!v || 'Esta fecha es requerida.',
      ],
    }),
    computed:{
      ...mapGetters(['userId'])
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },

      async verify() {
        this.KEEP_USERBIRTH(this.date)
        try{
          const response = await fetch(`${this.$url}/api/user/birth`,{
            method:'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idNumber: this.userId,
              birth:this.date
            })
          })
          await response.json()
          this.$router.push('/question')

        }catch(error){
          return error
        }
      },
      ...mapActions(['KEEP_USERBIRTH'])
    },
  }
</script>