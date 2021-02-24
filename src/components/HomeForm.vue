<template >
  <v-app >
    <v-container >
      <v-form 
        ref="form"
        v-model="valid"
        lazy-validation
      >
      <v-select
        v-model="user.idType"
        :items="values"
        :rules="[v => !!v || 'Item is required']"
        label="Item"
        required
      ></v-select>

      <v-text-field
        v-model="user.idNumber"
        :rules="idRules"
        label="Cédula"
        @keypress="isNumber($event)"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="¿Estás de acuerdo?"
        required
      ></v-checkbox>

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
  </v-app>
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
      values: [],
      valid: true,
      showSendDate : true,
      user:{
        idNumber:'',
        idType: '',
      },

      idRules: [
        v => !!v || 'Id is required',
        v => (v && v.length >= 5) || 'Name must be more than 4 characters'
        //v => /.+@.+\..+/.test(v) || 'id must be valid',
      ],
      checkbox: false
    }),
    computed: {
      ...mapGetters(['userBirth'])
    },
    created() {
      this.getValues ()
    },

    methods: {
      ...mapActions([
        'KEEP_USERID','KEEP_USERTOKEN','KEEP_USERID'
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
       ************ getValues *****************
       * pide la lista de tipos de identificación por el campo de descripción
       * 
       */
      getValues () {
        axios.get('http://localhost:3000/api/type/list')
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
        axios.get('http://localhost:3000/api/type/list')
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
        axios.post('http://localhost:3000/api/user/signin',this.user)
        .then((response) => response.data)
        .then(data => {
          if (data.tokenUser){
            this.KEEP_USERTOKEN(data.tokenUser)
            if(this.userBirth===null){
              console.log('hay que registrar el nacimiento')
              this.showSendDate = !this.showSendDate
            }
            else {
              console.log('ya está registrado')
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

