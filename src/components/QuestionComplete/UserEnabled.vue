<template>
    <v-app>
        <v-card
            elevation="4"
            max-width="700px"
            class="mx-auto"
            justify="space-around"
            v-if="!clearAttendance"
        >
            <v-card-title class="mx-auto"> Registro Exitoso</v-card-title>
            <v-card-subtitle>Su registro se completó correctamente</v-card-subtitle>
            <v-card-text class="mx-5">
                Si por alguna razón usted no puede asistir, puede dejar su cupo a disposición de otra persona. <br>
                Puede liberar su cupo haciendo click en el botón de abajo.
            </v-card-text>
            <v-card-actions>
                <v-btn
                class="blue mx-auto"
                @click="setNull"
                >
                    Liberar mi cupo
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