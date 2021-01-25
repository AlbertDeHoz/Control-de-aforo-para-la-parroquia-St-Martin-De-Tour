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
            :counter="10"
            :rules="nameRules"
            label="Nombre"
            required
            ></v-text-field>

            <v-text-field
            v-model="firstLastname"
            :counter="10"
            :rules="nameRules"
            label="Primer Apellido"
            required
            ></v-text-field>

            <v-text-field
            v-model="secondLastname"
            :counter="10"
            :rules="nameRules"
            label="Segundo Apellido"
            required
            ></v-text-field>

            <v-text-field
            v-model="user.age"
            :counter="10"
            :rules="ageRules"
            @keypress="isNumber($event)"
            label="Edad"
            required
            ></v-text-field>

            <v-text-field
            v-model="user.phone"
            :counter="10"
            :rules="phoneRules"
            @keypress="isNumber($event)"
            label="Teléfono"
            required
            ></v-text-field>

            <v-text-field
            v-model="user.address"
            :counter="10"
            :rules="nameRules"
            label="Dirección"
            required
            ></v-text-field>

            <v-select
            v-model="user.eps"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="EPS"
            required
            ></v-select>

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
            Reset Form
            </v-btn>

        </v-form>
    </v-app>
    </v-container>
</template>
<script>
import axios from 'axios';

export default {
    name:'RegisterForm',
    data: () => ({
        valid: true,
        firstLastname: '',
        secondLastname:'',
        user: {
            id:-4,
            firstName: '',
            lastName: '',
            address:'',
            age:null,
            phone:null,
            eps:null,
        },

        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        ageRules: [
            v => !!v || 'Age is required',
            v => (v && v.length <= 3) || 'Age must be less than 3 digits',
        ],
        phoneRules: [
            v => !!v || 'Phone number is required',
            v => (v && v.length <= 15) || 'Phone number must be less than 15 digits',
        ],
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,

    }),

    methods: {
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            evt.preventDefault();
            } else {
            return true;
            }
        },

        validate () {
            this.$refs.form.validate()
            this.register()
        },
        reset () {
            this.$refs.form.reset()
        },

        setUser (pUser) {
            pUser.lastName = this.firstLastname +' '+this.secondLastname;
            return pUser
        },

        register(){
            this.setUser(this.user)
            axios.post('http://localhost:3000/api/user/register',this.user)
            .then((response) => {
                console.log(response.data)
                this.$router.push('/question')
                return response.data
            })
            .catch((error) => {
                console.log(error);
            })
        }

    },
  }
</script>