<template>
    <v-app>
        <h2>*Preguntas de autoevaluación COVID-19* </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus culpa veritatis nostrum soluta nesciunt aperiam beatae praesentium doloribus laboriosam excepturi?</p>
        
        
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
    </v-app>
</template>

<script>
import axios from 'axios';

export default {

    name: 'QuestionForm',
    data: () => ({
        valid:true,
        preguntas:[],
        questions:[],
        answers: new Array(() => this.questions.length)
    }),
    created(){
        this.listQuestion();
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