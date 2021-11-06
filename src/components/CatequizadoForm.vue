<template>
  <form action="" class="mt-2">
    <v-row>
      <v-col cols="12" lg="6" class="pb-0">
        <v-text-field
          v-model="catequizado.nombres"
          label="Nombres Completos"
          outlined
          required
          :rules="rules.nombres"
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" class="pb-0">
        <v-text-field
          v-model="catequizado.apellidos"
          label="Apellidos Completos"
          required
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6" class="py-0">
        <v-text-field
          v-model="catequizado.identificacion"
          label="No de Identificación"
          required
          dense
          outlined
        ></v-text-field>

        <v-text-field
          v-model="catequizado.fecha_nacimiento"
          label="Fecha de Nacimiento"
          required
          dense
          outlined
        ></v-text-field>

        <v-text-field
          v-model="catequizado.celular"
          label="Celular"
          required
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="catequizado.colegio"
          label="colegio"
          required
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="catequizado.grado"
          label="grado"
          required
          outlined
          dense
        ></v-text-field>
      </v-col>

      <v-col cols="12" lg="6" class="py-0">
        <v-text-field
          v-model="catequizado.edad"
          label="Edad"
          required
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="catequizado.direccion"
          label="Dirección"
          required
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="catequizado.telefono_fijo"
          label="Teléfono fijo"
          required
          outlined
          dense
        ></v-text-field>

        <v-text-field
          v-model="catequizado.alergias"
          label="¿Presenta alergias?"
          required
          outlined
          dense
        ></v-text-field>

        <v-autocomplete
          v-model="catequizado.eps_codigo"
          :items="[1, 2, 3, 4]"
          label="Eps"
          outlined
          dense
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row
      ><v-col class="pt-0">
        <label for="es_bautizado" class="text-body-1"
          >Ya ha sido bautizado
        </label>
        <input
          type="checkbox"
          v-model="catequizado.es_bautizado"
          id="es_bautizado"
        /> </v-col
    ></v-row>
    <v-divider></v-divider>
    <!-- ------------------------------------------Sección para registrar acudiente del catequizado ------------------------- -->
    <h2 class="my-4">Acudiente</h2>
    <v-row>
      <v-col cols="12" lg="6" class="pb-0">
        <v-text-field
          v-model="catequizado.nombres"
          label="Nombres Completos"
          outlined
          required
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="6" class="pb-0">
        <v-text-field
          v-model="catequizado.apellidos"
          label="Apellidos Completos"
          required
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6" class="pt-0">
        <v-text-field
          v-model="catequizado.apellidos"
          label="Apellidos Completos"
          required
          dense
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
    <v-card-actions class="mt-4">
      <v-btn>enviar</v-btn>
    </v-card-actions>
  </form>
</template>

<script>
export default {
  props:{
    catequizadoEditado:Object
  },
  data() {
    return {
      catequizado: {
        id: "",
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
      rules:{
        nombres:[
          v => !!v || 'Name is required',
          v => v.length <= 10 || 'Name must be less than 10 characters',
        ],

      }
    };
  },

  mounted(){
    if (Object.keys(this.catequizadoEditado).length >= 0){
      this.catequizado = {...this.catequizadoEditado}
      console.log(this.catequizadoEditado)
    }
  }
};
</script>
