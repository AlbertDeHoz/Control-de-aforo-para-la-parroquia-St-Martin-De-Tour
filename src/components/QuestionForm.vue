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
            v-for="(question,n) in questions"
            v-model="answers[`${n}`]"
            :key="n"
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
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
                Validate
            </v-btn>
        </v-form>
        <pre>{{answers}}</pre>
        <pre>{{answers.length}}</pre>
        <pre>{{questions.length}}</pre>
        <pre>{{userId}}</pre>
    </v-app>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {

    name: 'QuestionForm',
    data: () => ({
        valid:true,
        questions:[],
        answers: new Array(() => this.questions.length)
    }),
    created(){
        this.listQuestion();
    },
    computed: {
        ...mapGetters([
            "userId"
        ])
    },
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        listQuestion () {
            axios
            .get('http://localhost:3000/api/question/list')
            .then((response) => {
                this.questions = response.data;
                console.log(this.questions)
            })
        }
    }
}
</script>