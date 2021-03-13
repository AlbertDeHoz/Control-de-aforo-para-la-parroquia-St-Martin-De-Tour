<template>
    <v-container>
        <v-card
        class="mx-auto px-4"
        max-width="600"
        color="blue lighten-5"
        >
            <v-card-title>
                Configuración de Servicio
            </v-card-title>
            <v-text-field
            v-model="name"
            label="nombre"
            :rules="rules"
            hide-details="auto"
            ></v-text-field>
            <p>Nombre del servicio</p>
            <v-text-field 
            v-model="attendance"
            label="asistencia"
            hide-details="auto"
            >
            </v-text-field>
            <p>Numero de personas a asistir</p>
            <v-text-field 
            v-model="schedule"
            label="Horario"
            hide-details="auto"
            >
            </v-text-field>
            <p>Horario</p>
            
            <v-row>
                <v-col
                cols="6"
                >
                  <v-switch
                  v-model="enable"
                  label="Habilitar formulario"
                  ></v-switch>
                  
                </v-col>
                <v-col
                cols="6"
                >
                <div
                class ="d-flex justify-end"
                >
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    @click="updateService()"
                  >
                  Actualizar
                  <v-icon
                    right
                    dark
                  >
                    mdi-cloud-upload
                  </v-icon>
                </v-btn>
                </div>
                </v-col>
            </v-row>
        </v-card>
  </v-container>
</template>
<script>

import {mapGetters} from 'vuex'
export default {
  data: () => ({
    name:null,
    attendance:null,
    schedule:null,
    enable:false,
    rules: [
      value => !!value || 'Required.',
    ],
  }),
  created(){
    this.getService()
  },
  computed:{
    ...mapGetters(['token'])
  },
  methods:{
    async getService (){
      const response = await fetch(this.$url + "/api/service/");
      const data = await response.json()
      this.setData(data)
    },
    setData(data){
      this.name = data.name;
      this.attendance = data.attendance;
      this.schedule = data.schedule;
      this.enable = data.enable;
    },
    async updateService (){
      const response = await fetch(this.$url + "/api/service/update",{
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.token
        },
        body: JSON.stringify({
          name: this.name,
          schedule: this.schedule,
          attendance: this.attendance,
          enable: this.enable
        })
      })
      return response
    }
  }
}
</script>