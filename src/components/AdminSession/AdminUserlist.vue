<template>
    <v-app>
        <v-container>
            <!--
                <user-table/>
            -->
            <enrollment-table/>
        </v-container>
    </v-app>
</template>
<script>
import EnrollmentTable from './EnrollmentTable'
//import UserTable from './UserTable.vue'
export default {
    components:{
//        UserTable
        EnrollmentTable
    },
    created(){
        this.getServices()
    },
    methods:{
        async getServices () {
            const response = await fetch(`${this.$url}/api/service/list`);
            const data = await response.json();
            this.services = data
        }
    }
}
</script>
