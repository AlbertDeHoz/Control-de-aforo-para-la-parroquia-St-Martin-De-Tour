<template>
    <v-app>
        <h2>*Preguntas de autoevaluación COVID-19* </h2>
        <p>Debe responder "NO" a todas las preguntas de este cuestionario para ingresar a nuestra ubicación física. Si responde "SÍ" a alguna de las preguntas, NO entre los edificios de la empresa y notifique a su superior inmediato.
        <br/>Si experimenta algún síntoma o responde "SÍ" a cualquiera de estas preguntas, debe comunicarse de inmediato con su profesional de la salud para conocer los próximos pasos recomendados y notificar a su gerente y Recursos Humanos.</p>
        
        
        <p>Responder _si_ o _no_ a las siguientes preguntas:</p>
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
            <pre>{{userId}},{{userIdType}}</pre>
        </v-form>
    </v-app>
</template>

<script>
import axios from 'axios';
import {mapGetters,mapActions} from 'vuex';

export default {

    name: 'QuestionForm',
    data: () => ({
        valid:true,
        questions:[],
        answers: new Array(),
        isAbleToSend: true,
    }),
    mounted(){
        this.listQuestion();
    },
    computed: {
        ...mapGetters([
            "userId","token","userEnabled","userIdType"
        ])
    },

    methods: {
        ...mapActions(['KEEP_ENABLED']),
        validate () {
            if(this.$refs.form.validate()){
                this.setEnable()
                console.log(this.userEnabled)
                this.isAbleToSend = false
            }
        },
        listQuestion () {
            axios
            .get('http://localhost:3000/api/question/list')
            .then((response) => {
                this.questions = response.data;
            })
            .catch(error => console.error(error))
        },
        setEnable() { //Quelque réponse est affirmative?
            const response = this.answers.find(element => element === 'si')?false:true
            this.KEEP_ENABLED(response)
            console.log(this.$store.state.userId)
            if (response) {
                axios
                .put('http://localhost:3000/api/user/enable',{idNumber:this.$store.state.userId})
                .then( (res) => res.data)
                .catch(error => console.log(error))
            }else(
                axios
                .put('http://localhost:3000/api/user/disable',{idNumber:this.$store.state.userId})
                .then( res => res.data)
                .catch(error => console.log(error))
            )
        }
    }
}
</script>