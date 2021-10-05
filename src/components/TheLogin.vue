<template>
    <v-app>
        
        <v-card
            class="mx-auto"
            max-width="344"
        >
            <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            height="200px"
            ></v-img>

            <v-card-title>
            Login
            </v-card-title>

            <v-card-subtitle>
            Admin session
            </v-card-subtitle>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                        v-model="user.username"
                        :counter="10"
                        :rules="nameRules"
                        label="Nombre"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="user.password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 4 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-spacer></v-spacer>
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
            </v-card-text>

        </v-card>
    </v-app>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    data: () => ({
        valid:true,   
        show1: false,
        user: {
            username: '',
            password: '',
        },
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 15) || 'Name must be less than 10 characters',
        ],
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min  characters',
            emailMatch: () => (`The email and password you entered don't match`),
        },
    }),
    methods:{
        ...mapActions(['KEEP_ROLE_AND_TOKEN']),
        validate () {
            this.$refs.form.validate()?this.verifyUser():false;
        },
        reset () {
            this.$refs.form.reset()
            this.user.username = '',
            this.user.password = ''
        },
        async verifyUser () {
            try{

                const response = await fetch(`${this.$url}/api/admin/login`,{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        username:this.user.username,
                        password:this.user.password    
                    })
                });
                const data = await response.json();
                if(data){
                    this.KEEP_ROLE_AND_TOKEN(data.userToken)
                    this.$router.push('/admin')
                }
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>