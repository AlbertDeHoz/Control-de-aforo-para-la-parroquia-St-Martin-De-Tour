<template>
    <v-container>

    <v-app>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
        >
            <v-text-field
            v-model="user.firstName"
            :rules="nameRules"
            label="Nombre"
            required
            ></v-text-field>

            <v-text-field
            v-model="firstLastname"
            :rules="lastnameRules"
            label="Primer Apellido"
            required
            ></v-text-field>

            <v-text-field
            v-model="secondLastname"
            :rules="lastnameRules"
            label="Segundo Apellido"
            required
            ></v-text-field>

            <v-text-field
            v-model="user.phone"
            :rules="phoneRules"
            @keypress="isNumber($event)"
            label="Teléfono"
            required
            ></v-text-field>

            <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="user.birth"
                    label="Fecha de nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    :rules="dateRules"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                ref="picker"
                v-model="user.birth"
                max="2015-01-01"
                min="1900-01-01"
                @change="save"
                ></v-date-picker>
                <!--new Date().toISOString().substr(0, 10)-->
            </v-menu>
            <!-- -->
            <v-text-field
            v-model="user.address"
            :counter="10"
            :rules="addressRules"
            label="Dirección"
            required
            ></v-text-field>

            <v-select
            v-model="user.EpsName"
            :items="items"
            :rules="[v => !!v || 'Se requiere llenar este campo']"
            label="EPS"
            required
            ></v-select>

            <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || '¡Debes estar de acuerdo para continuar!']"
            label="Estoy de acuerdo"
            required
            ></v-checkbox>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Enviar
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Limpiar formulario
            </v-btn>

        </v-form>
    </v-app>
    </v-container>
</template>
<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex';

export default {
    name:'RegisterForm',
    data: () => ({
        valid: true,          
        menu: false,
        firstLastname: '',
        secondLastname:'',
        idNumber: null,
        idType:null,
        user: {
            firstName: '',
            lastName: '',
            address:'',
            phone:null,
            EpsName:null,
            birth : null,
        },

        dateRules: [
            v => !!v || 'La fecha de nacimiento es requerida.',
        ],
        nameRules: [
            v => !!v || 'El nombre debe ser registrado.',
            v => (v && v.length <= 20 ) || 'Nombre debe tener menos de 20 caracteres.',
        ],
        lastnameRules: [
            v => !!v || 'Apellidos deben ser registrados.',
            v => (v && v.length <= 18 ) || 'Apellido debe tener menos de 18 caracteres.',
        ],
        phoneRules: [
            v => !!v || 'Se requiere el número de teléfono',
            v => (v && v.length <= 15) || 'El número de telefono debe tener menos de 15 caracteres.',
        ],
        addressRules: [
            v => !!v || 'Se requiere registrar la dirección.',
            v => (v && v.length <= 30) || 'La dirección debe tener menos de 30 caracteres.',
        ],
        items: [],
        checkbox: false,

    }),
    computed: {
        ...mapGetters(
            ['userId','userIdType']
        )
    },
    created () {
        this.cleanIdAndTypeStore()
        this.setItems()
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },

    methods: {
        ...mapActions(['KEEP_USERID']),

        cleanIdAndTypeStore(){
            this.idNumber = this.userId.idNumber;
            this.idType = this.userId.idType;
            this.KEEP_USERID(null)
            //this.userIdType
        },
        save (birth) {
            this.$refs.menu.save(birth)
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            } else {
            return true;
            }
        },

        setItems () {
            axios.get(`${this.$url}/api/eps/list`)
            .then( res => res.data)
            .then( data => data.forEach(element => {
                this.items.push(element.EpsName)
            }))
            .catch( error => console.log(error))
        },

        validate () {
            this.$refs.form.validate()?this.register():false;
        },
        reset () {
            this.$refs.form.reset()
        },

        setUser () {
            this.user.idNumber = this.idNumber;
            this.user.idType = 'CC'
            this.user.lastName = this.firstLastname +' '+this.secondLastname;
            this.user.firstName = this.user.firstName.toUpperCase();
            this.user.lastName = this.user.lastName.toUpperCase();
            this.user.address = this.user.address.toUpperCase();
        },

        register(){
            this.setUser()
            console.log(this.user)
            this.KEEP_USERID({
                idNumber: this.idNumber,
                idType:this.idType
            })
            axios.post(`${this.$url}/api/user/register`,this.user)
            .then((response) => {
                this.$router.push('/question')
                return response.data
            })
            .catch((error) => {
                console.log(error)
            })
        }

    },
  }
</script>
