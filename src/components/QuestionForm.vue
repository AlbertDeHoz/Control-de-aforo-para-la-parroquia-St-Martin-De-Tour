<template>
    <v-app>
        <div>
            <v-toolbar
            dark
            prominent
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <v-toolbar-title class="mx-auto">Preguntas de autoevaluación COVID-19</v-toolbar-title>
            <h1></h1>
            </v-toolbar>
        </div>
        <v-row
        class ="indigo lighten-4 mx-0 pt-5 blue-grey--text text--darken-4"
        >
        <v-col
        cols = "12"
        md="6"
        >
        <v-img src="../assets/identifica_los_sintomas.jpg" alt="identifica los síntomas." width="500px">
        </v-img>
        </v-col>
        <v-col
        cols="12"
        md="6"
        >
        <p class="text-h5">¡Hola {{username}}!, por favor responda "si" o "no" a las siguientes preguntas para determinar su riesgo de coronavirus (COVID-19):</p>
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
            <v-radio-group 
            v-for="(question,id) in questions"
            v-model="answers[question.id-1]"
            :key=id
            required
            class="indigo lighten-5 px-5 rounded-lg"
            elevation="12"
            :rules="[v => !!v || 'You must choise a option to continue!']"
            >
                <p>{{question.question}}</p>
                <v-radio
                    label="Sí"
                    value="si"
                ></v-radio>
                <v-radio
                    label="No"
                    value="no"
                    color="red darken-3"
                ></v-radio>
            </v-radio-group>
            <div
            class="mt-4 text-right"
            >
            <v-btn
            :disabled="!valid"
            color="indigo darken-4 indigo--text text--lighten-5"
            class="mr-4"
            @click="validate"
            >
                Reservar mi cupo
            </v-btn>
            </div>
        </v-form>
        </v-col>
        </v-row>
    </v-app>
</template>

<script>
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';
import Swal from 'sweetalert2';

export default {

    name: 'QuestionForm',
    props:['idType','idNumber'],
    data: () => ({
        valid:true,
        questions:[],
        answers: new Array(),
        isAbleToSend: true,
        userInEntry:null,
    }),
    mounted(){
        this.listQuestion();
    },
    computed: {
        ...mapGetters([
            "username","service"
        ])
    },
    methods: {
        ...mapActions(['KEEP_ENABLED']),
        
        /**
         * this.KEEP_ENABLED se limpia la variable enabled para que al rellenar otro formulario esta tenga valor nulo
         */

        validate () {
            if(this.$refs.form.validate()){
                this.verifyAnswer()
                this.KEEP_ENABLED(null)
                this.valid = !this.valid

            }
        },
        listQuestion () {
            axios
            .get(`${this.$url}/api/question/list`)
            .then((response) => {
                this.questions = response.data;
            })
            .catch(error => console.error(error))
        },
        

        setEnable(response) { 
            const userAptitude = response?'enable':'disable';
            axios
            .put(`${this.$url}/api/user/${userAptitude}`,{
                idNumber:this.idNumber,
                idType: this.idType
            })
            .then( (res) => {
                if (res.data){
                    this.KEEP_ENABLED(response)
                }
            })
            .catch(error => { 
                console.log(error)
                this.errorAlert()
            })
        },
        
        verifyAnswer(){
            this.answers.find(element => element === 'si')?this.setDisabled():this.submitEnrollment()
        },
        async setDisabled(){
            //al obtener un disabled hay que borrar todos los registros en enrollment
            try{
                this.setEnable(false);
                const response = await fetch(this.$url + `/api/enrollment/clearUser`,{
                    method:'DELETE',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({idNumber:this.idNumber})
                })
                const data = await response.json()
                if(!response.ok && !data.error){
                        throw new Error('error to send request')
                }else{
                    return
                }
            }catch(e){
                console.error(e)
            }

        },

        async submitEnrollment(){
            try{
                await axios.post(this.$url + "/api/enrollment/register",{
                    idNumber:this.idNumber,
                    code:this.service.code,
                    schedule:this.service.schedule
                })
                this.setEnable(true)
                this.$emit('isUserInEntry',true)
            }catch(error){
                console.error(error)
                this.errorAlert()
            }
        },

        errorAlert (){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal!',
                footer: '<a href="/">Por favor recargue la página y vuelva a intentarlo</a>'
            })
        }
    }
}
</script>