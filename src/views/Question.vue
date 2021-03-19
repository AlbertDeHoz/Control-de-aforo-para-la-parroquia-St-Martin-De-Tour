<template>

    <div
    style="max-width:900px;margin-right:auto;margin-left:auto"
    >
        <user-disabled v-if="userEnabled===false"/>
        <user-enabled v-else-if="userEnabled"/>
        <question-form v-else-if="userEnabled === null && attendance < attendanceMax"/>
        <full-capacity v-else />

    </div>
</template>
<script>
import QuestionForm from '../components/QuestionForm.vue'
import UserDisabled from '../components/QuestionComplete/UserDisabled'
import UserEnabled from '../components/QuestionComplete/UserEnabled'
import fullCapacity from  '../components/QuestionComplete/fullCapacity'
import {mapGetters,mapActions} from 'vuex'


export default {
    data: () => ({
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
            ['userEnabled','token','attendanceMax']
        ),
    },
    //beforeUpdated() {
    //    this.KEEP_ENABLED(true)
    //},
    created () {
        this.isAttendanceComplete()
        console.log(this.attendanceMax)
    },
    methods:{
        ...mapActions(['KEEP_ENABLED']),

        async isAttendanceComplete () {
            const response = await fetch(`${this.$url}/api/user/countuser`)
            const data = await response.json()
            if (data.length == 0){
                this.attendance = 0
            }else{
                this.attendance = data[0].conteo
                console.log(this.attendance)
            }
        }
        
    }

}
</script>
