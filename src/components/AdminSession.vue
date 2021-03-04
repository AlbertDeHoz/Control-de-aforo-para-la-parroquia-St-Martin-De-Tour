<template>
    <v-data-table
        :headers="headers"
        :items="Users"
        sort-by="calories"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar
            flat
        >
            <v-toolbar-title>Personas Registradas</v-toolbar-title>
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <div class="text-center">
                <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    >
                    Cambiar Lista
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn>
                    <download-csv
                        :data   = "Users">
                        Descargar CSV
                        <!--<img src="download_icon.png">-->
                    </download-csv>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="filterUserBy(item.action)"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
            
            <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="setEnableNull"
            >
                Limpiar Asistencia
            </v-btn>
            <v-spacer></v-spacer>
            <v-dialog
            v-model="dialog"
            max-width="500px"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
                >
                Agregar Nuevo
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.firstName"
                        label="Nombre(s)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.lastName"
                        label="Apellidos"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.EpsName"
                        label="EPS"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.idNumber"
                        label="Idetificación"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.idType"
                        label="Tipo de Id"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.birth"
                        label="Nacimiento"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.phone"
                        label="Teléfono"
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="4"
                    >
                        <v-text-field
                        v-model="editedItem.address"
                        label="Dirección"
                        ></v-text-field>
                    </v-col>
                    </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                >
                    Guardar
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        <!--
            <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
            </v-dialog>
        -->
        </v-toolbar>
        </template>
        
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                v-if="item.enable===true"
                medium
                class="mr-2 blue--text"
                @click="setDisable(item)"
            >
                mdi-toggle-switch
            </v-icon>
            <v-icon
                v-if="item.enable===false"
                medium
                class="mr-2 red--text"
                @click="setEnable(item)"
            >
                mdi-toggle-switch-off
            </v-icon>
            <v-icon
                v-if="item.enable===null"
                medium
                class="mr-2"
                @click="setDisable(item)"
            >
                mdi-toggle-switch-off-outline
            </v-icon>
            <v-icon
                v-if="item.enable!==null"
                small
                class="mr-2"
                @click="setNull(item)"
            >
                mdi-eraser
            </v-icon>

        </template>
        <template v-slot:no-data>
            <v-btn
                color="primary"
                @click="userList"
            >
                Reset
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import Vue from 'vue'
import JsonCSV from 'vue-json-csv'
import {mapGetters} from 'vuex'

Vue.component('downloadCsv', JsonCSV)
//import axios from 'axios';
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            { text: 'Tipo', value: 'idType' },
            { text: 'Identificación', value: 'idNumber'},
            { text: 'Nombres', value: 'firstName'},
            { text: 'Apellidos', value: 'lastName' },
            { text: 'Habilitado', value: 'enable' },
            { text: 'Acciones', value: 'actions', sortable: false },
        ],
        Users: [],
        editedIndex: -1,
        editedItem: {
            enable:null
        },

        items: [
            { title: 'todos',action:0 },
            { title: 'registrados para asistir',action:1},
        ],
    }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            ...mapGetters(['token'])
        },

        watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
        },

        created () {
        //this.initialize()
        this.userList()
        },

        methods: {
            filterUserBy(selector) {
                //selector is used to choise the option to apply:
                //select == 0 select all user
                //select == 1 select user enabled
                if (selector === 1){
                    this.Users = this.Users.filter( element =>{
                        return element.enable === true
                    })
                }
                else if (selector ===0){
                    this.userList()
                }
            },
            editItem (item) {
                this.editedIndex = this.Users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            /**
             * Set enable value for true
             */
            async setEnable (item) {
                //this.editedIndex = this.Users.indexOf(item)
                this.editedItem = Object.assign({}, item)
                await fetch('${this.$url}/api/user/enable',{
                    method:'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        idNumber: this.editedItem.idNumber
                    })
                })
                this.userList()                
            },
            /**
             * Set enable value for false
             */
            async setDisable (item) {
                this.editedItem = Object.assign({}, item)
                await fetch(`${this.$url}/api/user/disable`,{
                    method:'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        idNumber: this.editedItem.idNumber
                    })
                })
                this.userList()
            },
            async setNull (item) {
                this.editedItem = Object.assign({}, item)
                await fetch(`${this.$url}/api/user/null`,{
                    method:'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        idNumber: this.editedItem.idNumber
                    })
                })
                this.userList()
            },


            close () {
                this.dialog = false
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
                })
            },

            //closeDelete () {
            //    this.dialogDelete = false
            //    this.$nextTick(() => {
            //    this.editedItem = Object.assign({}, this.defaultItem)
            //    this.editedIndex = -1
            //    })
            //},

            async save () {
                if (this.editedIndex > -1) {
                    await fetch(`${this.$url}/api/user/update/${this.editedItem.id}`,{
                        method:'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            token:this.token
                        },
                        body:JSON.stringify(this.editedItem)
                    })
                    Object.assign(this.Users[this.editedIndex], this.editedItem)
                } else {
                    this.editedItem.firstName = this.editedItem.firstName.toUpperCase()
                    this.editedItem.lastName = this.editedItem.lastName.toUpperCase()
                    this.editedItem.address = this.editedItem.address.toUpperCase()
                    await fetch(`${this.$url}/api/user/register`,{
                        method:'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body:JSON.stringify(this.editedItem)
                    })
                    this.userList()
                    this.close()
                }
                this.close()
            },
            async userList () {
                try{
                    const response = await fetch(`${this.$url}/api/user/list`, {
                        headers:{
                            token:this.token
                        }
                    });
                    const data = await response.json();
                    this.Users = data;
                }catch(err){
                    console.error('something is wrong!')
                }
            },
            async setEnableNull () {
                const response = await fetch(`${this.$url}/api/user/setAllUserNull`,{
                    method:'PUT',
                    headers:{
                        token:this.token
                    }
                })
                await response.json()
                await this.userList()         
            }
        },
    }
</script>