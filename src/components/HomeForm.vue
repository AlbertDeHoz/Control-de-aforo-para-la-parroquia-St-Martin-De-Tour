<template>
  <v-app>
    <v-container>
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
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset
      </v-btn>
    </v-form>
  </v-container>
  <pre>{{values}}</pre>
  </v-app>
</template>

<script>
import axios from 'axios';
import {mapActions} from 'vuex';
import Swal from 'sweetalert2'

  export default {
    name:'HomeForm',
    data: () => ({
      items: [],
      values: [],
      valid: true,
      idTypes: null,
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

    created() {
      this.getIdType ()
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
      
      getIdType () {
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

      setIdType(){
        axios.get('http://localhost:3000/api/type/list')
        .then( res => res.data)
        .then(data => {
          const index = this.values.indexOf(this.user.idType);
          const idType = data[index].idType;
          this.user.idType = idType
          this.KEEP_USERID(this.user);
          this.verify()
        })
        .catch(error => console.log(error));
      },
      verify() {
        axios.post('http://localhost:3000/api/user/signin',this.user)
        .then((response) =>{
          console.log(response.data)
          if (response){
            this.KEEP_USERTOKEN(response.data.tokenUser)
            this.$router.push('/question')
          }
        })
        .catch((error)=>{
          if (error.response.data.error ==='Not Coincidence'){
            console.log('here is error')
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: 'verify your login credentials'
            })
        }else {
          this.$router.push('/register')
        }
        })
        
      }

    },
  }
</script>
