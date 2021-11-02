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
    </v-card-title>
    <v-data-table :headers="encabezados" :items="datos" :search="search">
    <template v-slot:[`item.iron`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
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
    };
  },
};
</script>
