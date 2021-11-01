<template>
  <v-card elevation="0">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          St Martín de Tours
        </v-list-item-title>
        <v-list-item-subtitle>
          Opciones
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item 
      v-for="item in items" 
      :key="item.title" 
      :to="item.path"
      link 
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: "title",
    event: "change",
  },
  props: {
    // this allows using the `value` prop for a different purpose
    value: String,
    // use `title` as the prop which take the place of `value`
    title: {
      type: String,
      default: "Default title",
    },
  },
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", path: "/" },
        { title: "Catequizados", icon: "mdi-forum", path: "/catequizados" },
      ],
    };
  },
  methods: {},
};
</script>

