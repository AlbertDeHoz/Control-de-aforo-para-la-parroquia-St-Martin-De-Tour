<template>
    <div>
      <v-row v-if="service">
        <v-col
          cols='6'
          text-center
        >
          <h3>Día: {{currentDateTime()}}</h3>
        </v-col>
        <v-col
          cols='6'
          text-center
        >
          <h3>hora: {{service.hour}}</h3>
        </v-col>
      </v-row>
        <v-form 
        ref="form"
        v-model="valid"
        lazy-validation
        class="px-5"
        >
            <v-select
            v-model="idType"
            :items="idTypes.map(idType => idType.description)"
            :rules="[v => !!v || 'Se requiere tipo de Identificación.']"
            label="Tipo de identificación"
            class="px-5 teal lighten-5"
            required
            ></v-select>

            <v-text-field
            v-model="user.idNumber"
            :rules="idRules"
            class="px-5 teal lighten-5"
            label="Número de Identificación"
            @keypress="isNumber($event)"
            required
            ></v-text-field>
            <v-card-actions
            class="justify-end"
            >
            <v-btn
            :disabled="!valid"
            class="mr-4 indigo darken-4 indigo--text text--lighten-5"
            @click="validate"
            v-if="showSendDate"
            >
            ¡Quiero asistir!
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            v-if="showSendDate"
            >
            Limpiar
            </v-btn>
            </v-card-actions>
            <send-date v-if="!showSendDate"/>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';
import {mapActions,mapGetters} from 'vuex';
import Swal from 'sweetalert2'
import SendDate from './SendDate'
import moment from 'moment'
  export default {
    name:'HomeForm',
    props:['service'],
    components:{
      SendDate
    },

    data: () => ({
      idTypes: [],
      idType: null, //este valor es el del modelo, es decir, tiene la descripcion de IdType mas no el name
      valid: true,
      showSendDate : true,
      user:{
        idNumber:'',
        idType: '',
      },

      idRules: [
        v => !!v || 'Se requiere Número de Identificación.',
        v => (v && v.length >= 5) || 'Identificación debe tener más de 5 caracteres.'
        //v => /.+@.+\..+/.test(v) || 'id must be valid',
      ],
    }),
    computed: {
      ...mapGetters(['userBirth'])
    },
    created() {
      this.getIdTypes ();
    },

    methods: {
      ...mapActions([
        'KEEP_USERID','KEEP_USERTOKEN','KEEP_SERVICE'
      ]),
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          evt.preventDefault();
        } else {
          return true;
        }
      },
            /**
       ************ getType *****************
       * pide la lista de tipos de identificación por el campo de descripción
       * 
       */
      getIdTypes () {
        axios.get(this.$url+'/api/type/list')
        .then( res => res.data)
        .then( data => {
          this.idTypes = data
        })
        .catch( error => console.log(error))
      },

      reset () {
        this.$refs.form.reset()
      },
      /**
       ******setIUserIdStore*********
       * cambia el valor de user.idType, de descripción a abreviación
       * pasa el valor de user a KEEP_USERID, es decir, se guarda en la vuex store
       * se ejecuta el método verify()
       */
      setUserIdStore(){
        const idTypeObject = this.idTypes.find(e => e.description === this.idType)
        this.user.idType = idTypeObject.idType
        this.KEEP_USERID(this.user)
      },

      currentDateTime() {
        moment.locale('es')
        return moment(this.service.schedule).format('LL')
      },
      /**
       *envia this.user para validar los datos del formulario
       *redireccina a las preguntas si todo está bien
       */
      verify() {
        this.setUserIdStore()
        this.KEEP_SERVICE(this.service)
        axios.post(this.$url + '/api/user/signin',this.user)
        .then((response) => response.data)
        .then(data => {
          if (data.tokenUser){
            this.KEEP_USERTOKEN(data.tokenUser)
            if(this.userBirth===null){  //hay que registrar el nacimiento
              this.showSendDate = !this.showSendDate
            }
            else {    //nacimiento ya registrado
              this.$router.push('/question')
            }
          }
        })
        .catch((error)=>{
          if (error.response.data.error ==='Not Coincidence'){
            console.log('here is error')
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Parece que hubo un error',
              footer: 'Por favor verifica tus datos, y vuelve a intentarlo'
            })
          }else {
            this.$router.push('/register')
          }
        })
      },
       validate () {
          if ( this.$refs.form.validate()){
            this.verify()
            this.valid=!this.valid
          }
      },
      
    },
  }
</script>