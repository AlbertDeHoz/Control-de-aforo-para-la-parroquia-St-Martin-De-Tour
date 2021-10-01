<template>
    <v-app>
        <div>
            <v-toolbar
            dark
            prominent
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <v-toolbar-title class="mx-auto">Formulario de Inscripción Parroquia San Martín de Tours</v-toolbar-title>

            </v-toolbar>
        </div>
        <v-container
        class = "pt-10 px-10 indigo lighten-5"
        >
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
            <v-row>
                <v-col
                cols ="4"
                md = "3"
                >
                    <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || '¡Debes estar de acuerdo para continuar!']"
                    label="Estoy de acuerdo"
                    required
                    ></v-checkbox>
                </v-col>
                <v-col
                cols="6"
                md = "4"
                class="pt-8"
                >
                    <a @click.stop="expand = !expand" class="indigo--text text--darken-1">leer términos y condiciones</a>
                </v-col>
            </v-row>
             <v-alert
             id="terms"
             v-show="expand"
            border="left"
            colored-border
            color="deep-purple accent-4"
            elevation="2"
            >
            <h3 class="text-h5">
                Autorización para el tratamiento y uso de datos personales.     
            </h3>
            <div class="pl-10">
                <p class="font-weight-light text-justify">
                    De conformidad con lo previsto en la Ley 1581 de 2012 “por la cual se dictan las disposiciones generales para la protección de datos personales” y el Decreto 1377 de 2013, que la reglamentan parcialmente, manifiesto que otorgo mi autorización expresa y clara para que la PARROQUIA SAN MARTIN DE TOURS, pueda hacer tratamiento y uso de mis datos personales, los cuales estarán reportados en la base de datos de la que es responsable dicha organización y que han sido recolectados por el formulario que he diligenciado. De acuerdo con la normatividad citada, la PARROQUIA SAN MARTIN DE TOURS queda autorizado de manera expresa e inequívoca para mantener y manejar la información suministrada, solo para aquellas finalidades para las que se encuentra facultado y respetando en todo caso, la normatividad vigente sobre protección de datos personales. No obstante, me reservo el derecho a ejercer en cualquier momento la posibilidad de conocer, actualizar, rectificar y solicitar la supresión de mis datos personales en la base de datos de la PARROQUIA SAN MARTIN DE TOURS, cuando así lo estime conveniente.
                </p>
            </div>
            </v-alert>
            <v-btn
            :disabled="!valid"
            color="indigo darken-4 indigo--text text--lighten-5"
            class="mr-4"
            @click="validate"
            >
            Enviar
            </v-btn>

            <v-btn
            color="red darken-5 indigo--text text--lighten-5"
            class="mr-4"
            @click="reset"
            >
            Limpiar formulario
            </v-btn>

        </v-form>
        </v-container>
    </v-app>
</template>
<script>
import axios from 'axios';
import {mapActions, mapGetters} from 'vuex';

export default {
    name:'RegisterForm',
    data: () => ({
        valid: true,
        expand: false,       
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
        ...mapActions(['KEEP_USERID','KEEP_ENABLED']),

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
            this.user.idType = this.idType
            this.user.lastName = this.firstLastname +' '+this.secondLastname;
            this.user.firstName = this.user.firstName.toUpperCase();
            this.user.lastName = this.user.lastName.toUpperCase();
            this.user.address = this.user.address.toUpperCase();
            this.KEEP_ENABLED(null)
        },

        register(){
            this.valid=!this.valid
            this.setUser()
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
