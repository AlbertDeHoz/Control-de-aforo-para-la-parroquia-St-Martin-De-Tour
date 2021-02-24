<template>
    <v-container>
        <user-disabled v-if="userEnabled===false"/>
        <user-enabled v-else-if="userEnabled"/>
        <question-form v-else-if="userEnabled === null && attendance <= attendaceMax"/>
        <full-capacity v-else />
        <pre>{{attendance}}</pre>
    </v-container>
</template>
<script>
import QuestionForm from '../components/QuestionForm.vue'
import UserDisabled from '../components/QuestionComplete/UserDisabled'
import UserEnabled from '../components/QuestionComplete/UserEnabled'
import fullCapacity from  '../components/QuestionComplete/fullCapacity'
import {mapGetters,mapActions} from 'vuex'


export default {
    data: () => ({
        attendaceMax : 10,
        attendance: null
    }),

    name:'Question',
    components:{
        QuestionForm,
        UserDisabled,
        UserEnabled,
        fullCapacity

    },
    computed: {
        ...mapGetters(
            ['userEnabled']
        ),
    },
    beforeUpdated() {
        this.KEEP_ENABLED(true)
    },
    created () {
        this.isAttendanceComplete()
    },
    methods:{
        ...mapActions(['KEEP_ENABLED']),

        async isAttendanceComplete () {
            const response = await fetch('http://localhost:3000/api/user/countuser')
            const data = await response.json()
            this.attendance = data[0].conteo
            console.log(this.attendance)
            
        }
    }

}
</script>