<template>
    <v-app>
    <v-container>
    <p class="text-justify">Sus datos se encuentran registrados satisfactoriamente. No obstante, para que su registro se complete totalmente, hace falta registrar su fecha de nacimiento.
    Puede leer más sobre los términos y condiciones haciendo <a href="#terms" class="blue--text" @click="expand = !expand">click aquí</a>
    </p>
    <v-alert
      v-show="expand"
      id="terms"
      border="left"
      colored-border
      color="deep-purple accent-4"
      elevation="2"
      >
      <h3 class="text-h5">
          Autorización para el tratamiento y uso de datos personales.     
      </h3>
      <div class="pl-10">
          <p class="font-weight-light text-justify">
              De conformidad con lo previsto en la Ley 1581 de 2012 “por la cual se dictan las disposiciones generales para la protección de datos personales” y el Decreto 1377 de 2013, que la reglamentan parcialmente, manifiesto que otorgo mi autorización expresa y clara para que la PARROQUIA SAN MARTIN DE TOURS, pueda hacer tratamiento y uso de mis datos personales, los cuales estarán reportados en la base de datos de la que es responsable dicha organización y que han sido recolectados por el formulario que he diligenciado. De acuerdo con la normatividad citada, la PARROQUIA SAN MARTIN DE TOURS queda autorizado de manera expresa e inequívoca para mantener y manejar la información suministrada, solo para aquellas finalidades para las que se encuentra facultado y respetando en todo caso, la normatividad vigente sobre protección de datos personales. No obstante, me reservo el derecho a ejercer en cualquier momento la posibilidad de conocer, actualizar, rectificar y solicitar la supresión de mis datos personales en la base de datos de la PARROQUIA SAN MARTIN DE TOURS, cuando así lo estime conveniente.
          </p>
      </div>
      </v-alert>
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
    </v-container>
    </v-app>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'

  export default {
    data: () => ({
      expand:false,
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
          console.log(this.userId)
          const response = await fetch(`${this.$url}/api/user/birth`,{
            method:'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idNumber: this.userId.idNumber,
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