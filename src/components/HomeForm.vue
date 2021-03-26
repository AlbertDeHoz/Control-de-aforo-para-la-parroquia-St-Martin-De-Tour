<template >
  <v-container >
    <v-row
      justify="center"
      no-gutters
    >
      <v-col lg = "12">
        <v-card
          max-width="500px"
          class="mx-auto py-5"
        >
          <v-img class = "mx-auto " width="300px" src="../assets/logo.jpg">
          </v-img>
          <v-container v-if="serviceList===null" class="text-center">
            <v-progress-circular
              :size="70"
              :width="7"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </v-container>
          <v-container v-else-if="serviceList.length>0">
            <v-card-title class="text-center" style="word-break: normal;">Bienvenido al formulario de inscripción de la Parroquia San Martín de Tours</v-card-title>
            <v-select
            v-model="serviceName"
              :items="serviceList.map(element => element.name)"
              label="Seleccione un Horario"
              outlined
              :rules="[v => !!v || 'Se requiere Horario']"
            ></v-select>
          <user-form v-show="serviceName" :service="serviceList.find(element => element.name ===serviceName)"/>
          </v-container>
          <v-container v-else>
            <v-card-title>
              No hay formularios Disponibles
            </v-card-title>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import UserForm from './HomeForm/UserForm'

  export default {
    name:'HomeForm',
    data: () =>({
      serviceList:null,
      serviceName:null
    }),
    components:{
      UserForm
    },
    created(){
      this.getServiceList()
    },
    methods:{
      async getServiceList(){
        const response = await fetch(`${this.$url}/api/service/list`)
        const data = await response.json();
        this.serviceList = await data.filter(service => service.enable===true)
      }

    }
  }
</script>