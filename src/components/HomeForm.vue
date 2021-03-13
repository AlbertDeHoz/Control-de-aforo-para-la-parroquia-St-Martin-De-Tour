<template >
    <v-container >
      <v-row
      justify="center"
      no-gutters
      >
        <v-col 
        lg = "12"
        >
        <v-card
        max-width="450px"
        class="mx-auto"
        >
          <v-container
            v-if ="enabledForm===null"
            class="text-center"
          >
            <div> 
                <v-progress-circular
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </div>
          </v-container>
          <v-container
          v-else-if="enabledForm===true"
          >
          <v-card-title>
            Eucaristía para el día {{service.schedule}}
          </v-card-title>
          <v-card-subtitle>
            {{service.name}}
          </v-card-subtitle>
          <v-form 
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <v-select
            v-model="user.idType"
            :items="values"
            :rules="[v => !!v || 'Se requiere tipo de Identificación.']"
            label="Tipo de identificación"
            required
          ></v-select>

          <v-text-field
            v-model="user.idNumber"
            :rules="idRules"
            label="Número de Identificación"
            @keypress="isNumber($event)"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            v-if="showSendDate"
          >
            Enviar
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            v-if="showSendDate"
          >
            Limpiar
          </v-btn>
          <send-date v-if="!showSendDate"/>
        </v-form>
        </v-container>
        <v-container
        v-else
        >
          <v-card-title>
            El formulario no está disponible aún
          </v-card-title>
        </v-container>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SendDate from './SendDate.vue'
import axios from 'axios';
import {mapActions,mapGetters} from 'vuex';
import Swal from 'sweetalert2'

  export default {
    name:'HomeForm',
    components:{
      SendDate
    },
    data: () => ({
      service:{},
      enabledForm : null,
      values: [],
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
      this.getService();
      this.getValues ();
    },

    methods: {
      ...mapActions([
        'KEEP_USERID','KEEP_USERTOKEN','KEEP_ATTENDANCEMAX'
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

      async getService (){
        const response = await fetch(this.$url + "/api/service/");
        const data = await response.json();
        this.enabledForm = data.enable;
        this.service = data;
        this.KEEP_ATTENDANCEMAX(data.attendance)
      },
      /**
       ************ getValues *****************
       * pide la lista de tipos de identificación por el campo de descripción
       * 
       */
      getValues () {
        axios.get(this.$url+'/api/type/list')
        .then( res => res.data)
        .then( data => {
          data.forEach(element => {
            this.values.push(element.description)
          });
          return this.values
        })
        .catch( error => console.log(error))
      },
      validate () {
        this.$refs.form.validate()?this.setIdType():false;
      },
      reset () {
        this.$refs.form.reset()
      },
      /**
       ******setIdType*********
       * cambia el valor de user.idType, de descripción a abreviación
       * pasa el valor de user a KEEP_USERID, es decir, se guarda en la vuex store
       * se ejecuta el método verify()
       */
      setIdType(){
        axios.get(this.$url + '/api/type/list')
        .then( res => res.data)
        .then(data => {
          const index = this.values.indexOf(this.user.idType);
          const idType = data[index].idType;
          this.user.idType = idType;
          this.KEEP_USERID(this.user);
          this.verify()
        })
        .catch(error => console.log(error));
      },
      /**
       *envia this.user para validar los datos del formulario
       *redireccina a las preguntas si todo está bien
       */
      verify() {
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
      }
    },
  }
</script>