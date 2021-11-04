<template>
  <form action="">
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="catequizado.nombres"
          label="Nombres Completos"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="catequizado.apellidos"
          label="Apellidos Completos"
          required
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="catequizado.identificacion"
          label="No de Identificación"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.fecha_nacimiento"
          label="Fecha de Nacimiento"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.celular"
          label="Celular"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.colegio"
          label="colegio"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.grado"
          label="grado"
          required
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="6">
        <v-text-field
          v-model="catequizado.edad"
          label="Edad"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.direccion"
          label="Dirección"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.telefono_fijo"
          label="Teléfono fijo"
          required
        ></v-text-field>

        <v-text-field
          v-model="catequizado.alergias"
          label="¿Presenta alergias?"
          required
        ></v-text-field>

        <v-autocomplete
          v-model="catequizado.eps_codigo"
          :items="[1, 2, 3, 4]"
          label="Eps"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row><v-col> 
      <v-radio-group v-model="catequizado.es_bautizado">
        <v-radio
        label="Está bautizado"
        :value="true"
        ></v-radio>
      </v-radio-group>
    </v-col></v-row>
  </form>
</template>

<script>
export default {
  data() {
    return {
      catequizado: {
        nombres: "",
        apellidos: "",
        identificacion: "",
        fecha_nacimiento: "",
        edad: "",
        direccion: "",
        colegio: "",
        telefono_fijo: "",
        celular: "",
        grado: "",
        alergias: "",
        eps_codigo: "",
        es_bautizado: false,
      },
    };
  },
};
</script>
