<template>
    <v-toolbar dense>

        <v-btn
        small
        text
        color='purple ligthen-5'
        class="mr-2"
        to="/admin/users"
        >
            Usuarios  
        </v-btn>                

        <get-services @getCode="redirectEnrollment"/>

        <v-spacer/>
        <div 
        class="text-center" 
        width="500">
            <v-btn
                small
                outlined
                color='purple ligthen-5'
                class="mr-2"
            >
                <download-csv
                :data="users"
                >
                    Exportar csv
            </download-csv>
            </v-btn>
            <v-btn
                small
                outlined
                color='purple ligthen-5'
                @click="$emit('addUser',{})"
            >
                Agregar
            </v-btn>
        </div>
    </v-toolbar>
</template>

<script>
import JsonCSV from 'vue-json-csv'
import GetServices from './GetServices'

export default {
    props:{
        users:Array
    },
    components:{
        DownloadCsv:JsonCSV,
        GetServices
    },
    methods:{
        redirectEnrollment(code){
            this.$router.push({path:"/admin/enrollment", query:{code}})
        }
    }

}
</script>