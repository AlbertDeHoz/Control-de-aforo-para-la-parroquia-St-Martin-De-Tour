<template>
  <v-card>
    <v-card-title>
      {{ titulo }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn small @click="emitAgregar()">Agregar nuevo</v-btn>
    </v-card-title>
    <v-data-table :headers="encabezados" :items="datos" :search="search">
      <template v-slot:[`item.iron`]="{ item }">
        <v-icon small class="mr-2" @click="emitEditar(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="() => 0">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  props: {
    titulo: String,
    encabezados: Array,
    datos: Array,
  },


  data() {
    return {
      search: "",
      dialog: false,
    };
  },

  methods: {
    toggleDialog() {
      this.dialog = !this.dialog;
    },

    emitEditar(item) {
      this.$emit('handle-editar',item);
    },
    
    emitAgregar() {
      this.$emit('handle-agregar');
    }
  },
};
</script>
