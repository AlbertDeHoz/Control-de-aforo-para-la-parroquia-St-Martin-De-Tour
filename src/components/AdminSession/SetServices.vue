<template>
    <v-container
    class='mx-auto'
    >
    <service-add/>
      <v-row
      >
        <v-col
        v-for="service, key in services" :key="key"
        sm="6"
        cols="12"
        >
        <v-card
        class="mb-5 mx-auto px-5"
        max-width="500"
        color="indigo lighten-5 blue-grey--text text--darken-4"
        >
            <v-card-title class="justify-center">
                Servicio: {{service.name}}
            </v-card-title>
            <v-text-field
            v-model="service.name"
            label="nombre"
            :rules="rules"
            hide-details="auto"
            ></v-text-field>
            <p>Nombre del servicio</p>
            <v-text-field 
            v-model="service.attendance"
            label="asistencia"
            hide-details="auto"
            >
            </v-text-field>
            <p>Personas a asistir</p>
            <v-text-field 
            v-model="service.schedule"
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
                  v-model="service.enable"
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
                    @click="updateService(service)"
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
        </v-col>
      </v-row>
  </v-container>
</template>
<script>

import {mapGetters} from 'vuex'
import ServiceAdd from './ServiceAdd'

export default {
  components:{
    ServiceAdd
  },

  data: () => ({
    name:null,
    attendance:null,
    schedule:null,
    enable:false,
    rules: [
      value => !!value || 'Required.',
    ],
    services: []
  }),
  created(){
    this.getService()
  },
  computed:{
    ...mapGetters(['token','service'])
  },
  methods:{
    async getService (){
      const response = await fetch(this.$url + "/api/service/list");
      const services = await response.json();
      this.services = services
    },
    setData(service){
      this.name = service.name;
      this.attendance = service.attendance;
      this.schedule = service.schedule;
      this.enable = service.enable;
    },
    async updateService (service){
      const response = await fetch(this.$url + "/api/service/update",{
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.token
        },
        body: JSON.stringify({
          id:service.id,
          name: service.name,
          schedule: service.schedule,
          attendance: service.attendance,
          enable: service.enable
        })
      })
      if(response.ok){
        this.getService()
      }
    },
    async createService(){

    }
  }
}
</script>