<template>
    <v-container>
        <question-form/>
    </v-container>
</template>
<script>
import QuestionForm from '../components/QuestionForm.vue'

export default {

    name:'Question',
    components:{
        QuestionForm
    }
}
</script>