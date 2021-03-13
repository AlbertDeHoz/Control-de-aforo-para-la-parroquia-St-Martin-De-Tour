<template>
    <v-app>
        <h1>*Preguntas de autoevaluación COVID-19* </h1>
        <img src="../assets/identifica_los_sintomas.jpg" alt="identifica los síntomas." width="500px">
        
        
        <h3>¡Hola {{username}}!, por favor responda "si" o "no" a las siguientes preguntas para determinar su riesgo de coronavirus (COVID-19):</h3>
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
            <v-btn
            v-if="isAbleToSend"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
                Enviar
            </v-btn>
        </v-form>
    </v-app>
</template>

<script>
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';
import Swal from 'sweetalert2';

export default {

    name: 'QuestionForm',
    data: () => ({
        valid:true,
        questions:[],
        answers: new Array(),
        isAbleToSend: true,
        idNumber: null,
        idType: null,
    }),
    mounted(){
        this.listQuestion();
    },
    computed: {
        ...mapGetters([
            "userId","username"
        ])
    },
    created(){
        this.cleanIdAndTypeStore()
    },
    methods: {
        ...mapActions(['KEEP_ENABLED','KEEP_USERID']),

        cleanIdAndTypeStore(){
            this.idNumber = this.userId.idNumber;
            this.idType = this.userId.idType;
            this.KEEP_USERID(null)
            //this.userIdType
        },

        validate () {
            if(this.$refs.form.validate()){
                this.setEnable()
                this.KEEP_ENABLED(null)
                this.isAbleToSend = false

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
        

        setEnable() { //Quelque réponse est affirmative?
            const response = this.answers.find(element => element === 'si')?false:true
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
                console.log('here')
                this.errorAlert()
            })
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