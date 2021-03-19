<template>
    <v-app>
        <v-container>
        <v-card
            elevation="4"
            max-width="500px"
            class="mx-auto indigo lighten-3"
            justify="space-around"
            v-if="!clearAttendance"
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
            <v-card-actions
            class="justify-center"
            >
            <v-btn
                class="indigo darken-4 indigo--text text--lighten-4"
                @click="setNull"
                >
                    Liberar mi cupo
                </v-btn>
            <v-btn
                class="pink darken-3 indigo--text text--lighten-5"
                to="/"
                >
                    Ir al formulario
                </v-btn>
            </v-card-actions>              
        </v-card>
        <v-card
            elevation="4"
            max-width="700px"
            class="mx-auto"
            justify="space-around"
            v-else
        >
            <v-card-title class="mx-auto"> Su registro se ha limpiado</v-card-title>
            <v-card-text class="mx-5">
                Puede volver a registrarse, ingresando sus datos en el formulario inicial y volviendo a llenar la encuesta
            </v-card-text>
        </v-card>
        </v-container>
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
import Swal from 'sweetalert2'

export default {
    data: () => ({
        clearAttendance : false

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
                    body: JSON.stringify(this.userId)
                })
                const data = await response.json ()
                if (data.error){
                    this.errorAlert()
                }else {
                    this.clearAttendance = true
                }
            }catch(error){
                console.log(error)
                this.errorAlert()
            }
        },
        errorAlert () {
            Swal.fire({
            icon: 'error',
            title: 'No se pudo liberar tu cupo',
            text: 'Hubo un error al procesar tu solicitud, por favor comuniquese con nosotros',
            footer: '<a href="/">O intenta más tarde, haciendo click aquí</a>'
            })
        }


    },
    computed: {
        ...mapGetters(['userId'])
    }
    
}
</script>