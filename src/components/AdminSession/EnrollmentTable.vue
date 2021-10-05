<template>
<div>
    <v-toolbar
        class="hidden-sm-and-down justify-center"
        dense
        height="60"

    >
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                text
                v-bind="attrs"
                v-on="on"
                >
                servicio
                </v-btn>
            </template>
            <v-list>
                <v-list-item
                v-for="(item, index) in service"
                :key="index"
                >
                <v-list-item-title
                @click="getEnrollmentByCode(item.code)"
                >{{ item.name }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-btn
        text
        >
        <download-csv
            :data   = "downloadCSV()">
            Descargar CSV
            <!--<img src="download_icon.png">-->
        </download-csv>
        </v-btn>
        <v-spacer/>
        <h5 >{{title}}</h5>
        <v-spacer/>
        <v-form>
        <v-row
        style="width:300px"
        >
            <v-col
            cols="7"
            class="px-0 mx-0"
            >
                <v-text-field
                v-model="idNumber"
                label="Identificación"
                clearable
                outlined
                height="30"
                class='pt-7 pr-3'
                >
                </v-text-field>
            </v-col>
            <v-col
            cols="5"
            class='my-auto'
            >
                <v-btn
                @click="submitEnrollment(idNumber)"
                class='primary'
                >
                Agregar
                </v-btn>
            </v-col>
        </v-row>
        </v-form>


    </v-toolbar>
    <v-bottom-navigation
    class="hidden-sm-and-up"
    >
        <v-btn>
        <span>Menu</span>
        <v-icon>mdi-history</v-icon>
        </v-btn>
    </v-bottom-navigation>
    <v-data-table
    :headers="headers"
    :items="enrollmentPerCode"
    sort-by="idNumber"
    class="elevation-1"
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-btn
                small
                class="mr-2 error"
                @click="clearUserInService (item.idNumber, code)"
            >
                retirar
            </v-btn>

        </template>
  </v-data-table>
</div>
</template>

<script>
import JsonCSV from 'vue-json-csv'
import {mapGetters} from 'vuex'
import Vue from 'vue'
import Swal from 'sweetalert2'


Vue.component('downloadCsv', JsonCSV)
export default Vue.extend({
    data:()=>({
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
        enrollmentPerCode: [],
        code:null,
        idNumber:null,
        title:''
    }),
    created(){
        this.firstCode()
    },
    computed:{
        ...mapGetters(['service'])
    },
    methods:{
        firstCode () {
            if (this.service[0]){
                this.getEnrollmentByCode(this.service[0].code)
            }
        },
        
        async getEnrollmentByCode (code) {
            this.enrollmentPerCode=[]
            const response = await fetch(`${this.$url}/api/enrollment/code/${code}`);
            const data = await response.json();
            this.enrollmentPerCode = data
            this.code = code
            this.setTitle(code)
        },
        setTitle(code){
            const service = this.service.find(e => e.code===code)
            this.title = service.name
        },
        downloadCSV(){
            return this.enrollmentPerCode.map(element => ({
                Documento:element.idNumber,
                Nombre:element.User.firstName,
                Apellidos:element.User.lastName,
                Hora:element.Service.hour
            }))
        },
        async clearUserInService (idNumber,code){
            const response = await fetch(`${this.$url}/api/enrollment/clearUserInService`,{
                method:'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    idNumber:idNumber,
                    code:code
                })
            })
            if (response.ok){
                //const data = await response.json();
                this.getEnrollmentByCode (code)
                return
            }
            else{
                console.error(response)
            }
        },
        
        async submitEnrollment(idNumber){
            const {code,schedule} = this.service.find(e => e.code===this.code)
            try{
                const response = await fetch(this.$url + "/api/enrollment/register",{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({
                        idNumber:idNumber,
                        code:code,
                        schedule:schedule
                    })
                })
                const data = await response.json()
                if(response.ok){
                    if(data.note){
                        Swal.fire('Ya registrado para este día')
                    }else
                        this.getEnrollmentByCode (code)
                }else{
                    Swal.fire('Usuario no registrado')
                }
            }catch(error){
                console.error(error)
            }
        },
    },

})
</script>