<template>
    <v-container>
        <question-form/>
        <user-disabled v-if="!userEnabled"/>
        <user-enabled v-if="userEnabled"/>
        <pre>{{userEnabled}}</pre>
    </v-container>
</template>
<script>
import QuestionForm from '../components/QuestionForm.vue'
import UserDisabled from '../components/QuestionComplete/UserDisabled'
import UserEnabled from '../components/QuestionComplete/UserEnabled'
import {mapGetters} from 'vuex'


export default {

    name:'Question',
    components:{
        QuestionForm,
        UserDisabled,
        UserEnabled
    },
    computed: {
        ...mapGetters(
            ['userEnabled']
        )
    }
}
</script>