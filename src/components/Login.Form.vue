<template>
  <v-card class="px-7">
    <v-card-title class="mx-auto"><v-spacer/>
      <h1 class="text-h4">LOGIN</h1><v-spacer/>
    </v-card-title>
    <v-form ref="form">
      <v-text-field
        v-model="registrar"
        type="text"
        :rules="registrarRules"
        label="Nombre de usuario"
        class="px-2"
        outlined
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :rules="passwordRules"
        label="Contraseña"
        class="px-2"
        outlined
        required
      ></v-text-field>

      <v-card-actions>
        <v-btn 
          block
          color="primary"
          depressed
          @click="submitRegistrar"
        >Ingresar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    registrar:"",
    password:"",
    registrarRules: [
      (v) => !!v || "Se requiere nombre de usuario",
      (v) => v.length >= 6 || "Recuerda que el nombre de usuario tiene más de 6 caracteres",
    ],
    passwordRules: [
      (v) => !!v || "Se requiere contraseña"
    ],
  }),
  methods:{
    submitRegistrar () {
      console.log(this.registrar);
    }
  }
};
</script>
