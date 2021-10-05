<template>
    <v-app>
        <v-container>
        <v-card v-if="!isAttendanceListEmpty"
            elevation="4"
            max-width="500px"
            class="mx-auto indigo lighten-3"
            justify="space-around"
        >
            <v-img 
            contain
            src="../../assets/prevencion1.jpg"
            alt=""></v-img>
            <v-card-title style="color:#252349" ><span class="indigo lighten-5 px-3 rounded-lg">Registro Exitoso</span></v-card-title>
            <v-card-subtitle class = 'pl-7' style="color:#252349">Su registro se completó correctamente</v-card-subtitle>
            <v-card-text class="mx-5">
                Si por alguna razón usted no puede asistir, puede dejar su cupo a disposición de otra persona.
                Puede liberar su cupo haciendo click en el botón de abajo.
            </v-card-text>
            <v-row v-for="entry,id in attendanceList" :key="id" 
            class="red mx-5 my-2 indigo lighten-2 px-3 rounded-lg" >
                <v-card-text class='py-1 text-center text-h6'>{{entry.Service.name}}</v-card-text>
                <v-col
                cols="4"
                sm="6"
                >
                    <v-card-text class='py-0 text-center'>Hora: {{entry.Service.hour}}</v-card-text>
                </v-col>
                <v-col
                cols ="8"
                class='my-auto'
                sm="6"
               
                >
                    <v-btn
                    @click="deletteAttendance(entry)"
                    class='py-0'
                     small
                    >
                        retirar este cupo
                    </v-btn>
                </v-col>
            </v-row>
            <v-card-actions
            class="justify-center"
            >
            <v-btn
                class="indigo darken-4 indigo--text text--lighten-4"
                @click="deleteAllAttendance"
                >
                    Liberar todo
                </v-btn>
            <v-btn
                class="pink darken-3 indigo--text text--lighten-5"
                to="/"
                >
                    Ir al formulario
                </v-btn>
            </v-card-actions>    
        </v-card>
        <v-card v-else
            elevation="4"
            max-width="500px"
            class="mx-auto"
            justify="space-around"
        >
            <v-card-title class="mx-auto"> Su registro se ha limpiado</v-card-title>
            <v-card-text class="px-5">
                Puede volver a registrarse, ingresando sus datos en el formulario inicial y volviendo a llenar la encuesta
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn
                class="pink darken-3 indigo--text text--lighten-5"
                to="/"
                >
                    Ir al formulario
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import Swal from 'sweetalert2'

export default {
    props:{
        idNumber:String
    },
    data: () => ({
        attendanceList:null,
        isAttendanceListEmpty: false

    }),
    methods: {
        async setNull () {
            try{
                const response = await fetch(`${this.$url}/api/user/null`,{
                    method:'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },                    
                    body: JSON.stringify({
                        idNumber:this.idNumber
                    })
                })
                const data = await response.json ()
                if (data.error){
                    this.errorAlert()
                }else
                    this.isAttendanceListEmpty = true
            }catch(error){
                console.log(error)
                this.errorAlert()
            }
        },
        async deletteAttendance(data){
            const response = await fetch(this.$url + '/api/enrollment/clearUserInService',{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },  
                body:JSON.stringify({
                    idNumber:data.idNumber,
                    code:data.code
                })
            })
            if (!response.ok){
                this.errorAlert()
            }else{
                this.updateAttendanceList(); 
            }
        },

        async deleteAllAttendance(){
            const response = await fetch(this.$url + '/api/enrollment/clearUser',{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ idNumber:this.idNumber })
            })
            if (!response.ok){
                this.errorAlert()
            }else{
                this.setNull();
            }
        },

        errorAlert () {
            Swal.fire({
            icon: 'error',
            title: 'No se pudo liberar tu cupo',
            text: 'Hubo un error al procesar tu solicitud, por favor comuniquese con nosotros',
            footer: '<a href="/">O intenta más tarde, haciendo click aquí</a>'
            })
        },

        async updateAttendanceList () {
            const response = await fetch(this.$url + `/api/enrollment/user/${this.idNumber}`)
            const data = await response.json();
            this.attendanceList = data
            data.length===0? this.setNull() : this.isAttendanceListEmpty=false
        },

    },


    created(){
        this.updateAttendanceList()
    },
    computed: {
        ...mapGetters(['userId'])
    }
    
}
</script>