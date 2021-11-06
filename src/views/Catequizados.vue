<template>
  <v-app>
    <Tabla
      :datos="catequizados"
      :encabezados="encabezados"
      titulo="Catequizados"
      @handle-agregar="agregarCatequizado"
      @handle-editar="editarCatequizado"
    ></Tabla>
    <v-dialog v-model="dialog" max-width="960" scrollable>
      <v-card>
        <v-card-title>Registrar catequizado</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <CatequizadoForm :catequizadoEditado="catequizadoEditado"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Tabla from "../components/Tabla.vue";
import CatequizadoForm from "../components/CatequizadoForm.vue";

export default {
  data: () => ({
    dialog: false,
    catequizados: [
      {
        id: "1",
        nombres: "Santiago",
        apellidos: "De Chile",
        identificacion: "022335",
        fecha_nacimiento: new Date('2021-21-12'),
        edad: "12",
        direccion: "calle 45 #23",
        colegio: "Santa Sofía",
        telefono_fijo: "",
        celular: "300 645 0022",
        grado: "",
        alergias: "",
        eps_codigo: "",
        es_bautizado: false,
      },
    ],
    encabezados: [
      { text: "Apellidos",
        align: "start",
        sortable: false,
        value: "apellidos",
      },
      { text: "Nombres", value: "nombres" },
      { text: "identificación", value: "identificacion" },
      { text: "Celular", value:"celular"},
      { text: "Colegio", value:"colegio"},
      { text: "Bautizado?", value: "es_bautizado"},
      { text: "Acciones", value:"actions"},
    ],
    catequizadoEditado:{}
  }),
  components: {
    Tabla,
    CatequizadoForm,
  },
  mounted(){
    this.catequizados = this.catequizados.map(
      catequizado => ({
        ...catequizado
        ,es_bautizado:catequizado.es_bautizado?"Sí":"No"
      })
    )
  },
  methods: {

    leerCatequidados() {
      // TODO
    },

    agregarCatequizado() {
      this.dialog = !this.dialog;
    },

    lanzarCatequizadoForm() {
      this.dialog = true;
    },

    editarCatequizado(catequizado) {
      this.catequizadoEditado = {...catequizado}
      this.dialog = true;
    },
  },
};
</script>
