<template>

    <div
    style="max-width:900px;margin-right:auto;margin-left:auto"
    >
        <div v-if="userEnabled ===false">
            <user-disabled/>
        </div>
        <div v-else>

            <v-app v-if="isUserInEntry===''">
                <v-card
                height="50px"
                class='py-auto'
                >
                </v-card>
                <v-progress-linear
                    indeterminate
                    color="cyan"
                ></v-progress-linear>
            </v-app>
            <div v-else-if="isUserInEntry">
                <user-enabled :idNumber="idNumber"/>
            </div>
            <div v-else>
                <div v-if="!isAttendanceComplete">
                    <question-form  @isUserInEntry="isUserInEntry=$event" :idNumber="idNumber" :idType="idType"/>            
                </div>
                <full-capacity v-else/>
            </div>

        </div>


        <!--
        -->
    </div>
</template>
<script>
import QuestionForm from '../components/QuestionForm.vue'
import UserEnabled from '../components/QuestionComplete/UserEnabled'
import UserDisabled from '../components/QuestionComplete/UserDisabled'
import fullCapacity from  '../components/QuestionComplete/fullCapacity'
import {mapGetters,mapActions} from 'vuex'
import FullCapacity from '../components/QuestionComplete/fullCapacity.vue'
import Swal from 'sweetalert2'


export default {
    
    name:'Question',
    components:{
        QuestionForm,
        UserEnabled,
        UserDisabled,
        FullCapacity,
        fullCapacity
    },
    data: () => ({
        idNumber:null,
        idType:null,
        isUserInEntry: '',
        enrollmentPerUser:['hola'],
        isAttendanceComplete:false
    }),
    computed: {
        ...mapGetters(
            ['userEnabled','userId','service']
        ),
    },
    //beforeUpdated() {
    //    this.KEEP_ENABLED(true)
    //},
    created () {
        this.cleanIdAndTypeStore()
        this.getAttendancePerService()
        this.getAttendancePerUser()
    },
    methods:{
        ...mapActions(['KEEP_ENABLED','KEEP_USERID']),

        async getAttendancePerService () {
            const response = await fetch(this.$url + `/api/enrollment/attendance/${this.service.code}`)
            const data = await response.json()
            if(data.length>0)
                this.isAttendanceComplete = this.service.attendance <= data[0].conteo
            else
                this.isAttendanceComplete = false
        },

        //verifica si el usuario está registrado, y devuelve un arreglo con los registros previos, si los hay
        async getAttendancePerUser () {
            const response = await fetch(this.$url + `/api/enrollment/user/${this.idNumber}`);
            try{
                const data = await response.json();
                this.enrollmentPerUser = data
                this.isUserInEntry = data.find(e => e.code === this.service.code)
                if (!this.isUserInEntry){
                    this.isMatchDate()
                }
            }catch{
                console.error({error:'not found'})
                return null
            }
        },

        async isMatchDate(){
            const response = await fetch(`${this.$url}/api/enrollment/matchDate`,{
                method:'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    idNumber:this.idNumber,
                    code:this.service.code,
                    schedule:this.service.schedule
                })
            })
            const data = await response.json();
            if(data.note){
                this.isUserInEntry=true
                Swal.fire('Usted tiene un registro para este día en otro horario')
            }            
        },

        cleanIdAndTypeStore(){
            this.idNumber = this.userId.idNumber;
            this.idType = this.userId.idType;
            this.KEEP_USERID(null)
        },

    }
}
</script>
