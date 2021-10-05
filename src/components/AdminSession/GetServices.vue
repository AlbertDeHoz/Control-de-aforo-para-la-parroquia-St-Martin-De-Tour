<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          text
          color="purple ligthen-5"
          class="mr-2"
          v-bind="attrs"
          v-on="on"
        >
          registrados
        </v-btn>
      </template>
      <v-card class="mx-auto" max-width="600" tile>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="purple">
            <v-list-item
              v-for="(item, index) in services"
              :key="index"
              type="submit"
            >
              <v-btn
              type="submit"
              @click.stop.prevent="submitService(item)"
              text
              >
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    services: [{ name: "no hay servicios" }],
    selectedItem: false,
  }),
  created() {
    this.getServices();
  },
  methods: {
    async getServices() {
      const response = await fetch(this.$url + "/api/service/list");
      const services = await response.json();
      this.services = services;
    },
    submitService(item) {
      this.$emit("getCode", item.code);
    },
  },
};
</script>
