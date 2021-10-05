<template>
    <div>
        <v-row>
            <v-col
            cols="12"
            sm="6"
            >
            <v-card
                class="mx-auto mt-4"
                max-width="400"
            >
                <v-card-text>
                <div>Configura los usuarios</div>
                <p class="display-1 text--primary">
                    Usuarios
                </p>
                <div class="text--primary">
                    <ul>
                        <li>Configuración de lista de usuarios y asistentes</li>
                        <li>Descarga la base de datos de personas registradas</li>
                        <li>Habilita a las personas que asisten</li>
                    </ul>
                </div>
                </v-card-text>
                <v-card-actions>
                <v-btn
                    text
                    color="deep-purple accent-4"
                    to="/admin/users"
                >
                    Ir a Usuarios
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-col>
            <v-col
            cols="12"
            sm="6"
            >
            <v-card
            class="mx-auto mt-4"
            max-width="400"
        >
            <v-card-text>
            <div>Configura los Servicios</div>
            <p class="display-1 text--primary">
                Servicios
            </p>
            <div class="text--primary">
                <ul>
                    <li>Habilita el formulario cuando sea necesario.</li>
                    <li>Configura la cantidad de personas que pueden asistir.</li>
                    <li>Configura el nombre del servicio y el horario de éste.</li>
                </ul>
            </div>
            </v-card-text>
            <v-card-actions>
            <v-btn
                text
                color="deep-purple accent-4"
                to="/admin/services"
            >
                ir a servicios
            </v-btn>
            </v-card-actions>
            </v-card>                
            </v-col>
        </v-row>
    </div>
    
</template>
<script>
import {mapActions} from 'vuex'

export default {
    props:['input'],
    data: () =>({
        service:[]
    }),
    created(){
        this.getServices()
    },
    methods:{
        ...mapActions(['KEEP_SERVICE']),

        async getServices(){
            const response = await fetch(`${this.$url}/api/service/list`)
            const service = await response.json()
            console.log(this.input)
            this.KEEP_SERVICE(service)
        }
    }
}
</script>
