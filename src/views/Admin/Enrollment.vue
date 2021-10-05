<template>
<div>
    <user-toolbar
    :users="users"
    />
    <user-table 
    :users="users"
    :headers="headers"
    />
</div>
</template>

<script>
import UserToolbar from '../../components/AdminSession/UserToolbar.vue'
import UserTable from '../../components/AdminSession/UserTable.vue'
export default {
    name:'Enrollment',
    components:{
        UserToolbar,
        UserTable
    },
    data:()=>({
        code:'',
        users:[],
        headers: [
            {
                text: 'Documento',
                align: 'start',
                sortable: false,
                value: 'idNumber',
            },
            { text: 'Nombre', value: 'User.firstName' },
            { text: 'Apellidos', value: 'User.lastName' },
            { text: 'Hora', value: 'Service.hour' },
            { text: 'Acciones', value: 'actions', sortable:false}
        ],
    }),
    created(){
        this.code = this.$route.query.code
        this.getUsersByCode(this.code)
    },
    methods:{
        async getUsersByCode (code) {
            const response = await fetch(`${this.$url}/api/enrollment/code/${code}`);
            const data = await response.json();
            //this.enrollmentPerCode = data
            this.users=data
        },

    }

}

</script>