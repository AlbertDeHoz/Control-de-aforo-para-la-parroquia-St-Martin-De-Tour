<template>
    <v-dialog
        v-model="showAddService"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-show="!showAddService"
            color="pink"
            class="mr-5 mb-7"
            dark
            absolute
            bottom
            right
            fab
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <service-card input="add" @showAddService="showAddService=$event"/>
      </v-dialog>
</template>
<script>

import ServiceCard from './ServiceCard'
export default {
  components:{
    ServiceCard
  },
  data: () => ({
    showAddService:false,
    serviceToAdd:{}
  }),
  created(){
  },
  methods:{
   

  }
}
</script>
