<template>
    <v-card>
        <v-card-title class="headline grey lighten-2">
        Agregar Servicio
        </v-card-title>

        <v-form
            class="px-7"
        >
            <v-card-title class="justify-center">
            </v-card-title>
            <v-text-field
            v-model="service.name"
            label="nombre"
            hide-details="auto"
            ></v-text-field>
            <p>Nombre del servicio</p>
            <v-text-field 
            v-model="service.attendance"
            label="asistencia"
            hide-details="auto"
            ></v-text-field>
            <p>Número de Asistentes</p>
            <v-row>
                <v-col
                cols="6"
                >
                <v-text-field 
                    v-model="service.schedule"
                    label="Fecha"
                    hide-details="auto"
                    >
                </v-text-field>
                </v-col>
                <v-col
                cols="6"
                >
                <v-text-field 
                    v-model="service.hour"
                    label="hora"
                    hide-details="auto"
                    >
                </v-text-field>
                </v-col>
                

            </v-row>
            <p>Horario</p>
                <v-switch
                class="mx-auto"
                style="width:200px "
                v-model="service.enable"
                label="Habilitar formulario"
                ></v-switch>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            text
            @click="response()"
        >
            Agregar
        </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>

import {mapGetters} from 'vuex'

export default {
    props:['input'],
    data:()=>({
        service:{
            name:'',
            attendance:0,
            hour:'',
            enable:false
        }
    }),
    computed:{
        ...mapGetters({
            services:'service',
            token:'token'
        })
    },
    methods:{
        response(){
            if(this.input==='add'){
                this.addService();
                this.$emit('showAddService',false)
            }
        },
        async addService() {
            const response = await fetch(`${this.$url}/api/service/create`,{
                method:'POST',
                headers:{
                    token:this.token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    code:this.generateCodeService(),
                    name:this.service.name,
                    attendance:this.service.attendance,
                    hour:this.service.hour,
                    schedule:this.service.schedule,
                    enable:this.service.enable
                
                })
            })
            const data = await response.json()
            console.log(data)
        },

        generateCodeService(){
            const ids = this.services.map(e=>e.id)
            let max = 0
            ids.forEach(element => {
                if(element > max){
                    max=element
                }
            });
            const strPart = this.service.name.split(" ",2)
            const str = strPart.map(e=>e.charAt(0)).join('').toUpperCase()
            console.log(str+max)
            return str+max
        }
    }
}
</script>