<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
      @click:outside="close()"
      @keydown="(e) => (e.key === 'Escape' ? close() : false)"
    >
      <v-card>
        <v-card-title>
          <!-- <span class="headline">{{ formTitle }}</span> -->
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.firstName"
                  label="Nombre(s)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.lastName"
                  label="Apellidos"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="user.EpsName" label="EPS"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.idNumber"
                  label="Idetificación"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.idType"
                  label="Tipo de Id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.birth"
                  label="Nacimiento"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.phone"
                  label="Teléfono"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="user.address"
                  label="Dirección"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="save">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Boolean,
    user: Object,
    selector: String,
    token: String,
  },
  data() {
    return {
      newUser: null,
    };
  },
  methods: {
    save() {
      if (this.selector === "edit" && this.update(this.user, this.token)) {
        this.$emit("returnUser", { ...this.user });
        return;
      }
      this.add(this.user, this.token).then(() => {
        if (
          this.selector === "add" &&
          (this.newUser || Object.keys(this.newUser).length > 0)
        ) {
          this.$emit("returnUser", { ...this.newUser });
          return;
        }
        throw "error";
      });
    },

    close() {
      this.$emit("close");
    },

    async update(user, token) {
      const response = await fetch(`${this.$url}/api/user/update/${user.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ ...user }),
      });
      if (response.ok) {
        return 1;
      }
      return 0;
    },

    async add(user, token) {
      const response = await fetch(`${this.$url}/api/user/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ ...user }),
      });
      const data = await response.json();
      if (response.ok) {
        this.newUser = { ...data };
        return;
      }
    },
  },
};
</script>
