<template>
  <!-- <admin-userlist/> -->
  <div>
    <user-toolbar @addUser="openUserCard" :users="users" />
    <user-table 
      :users="users" 
      @editUser="openUserCard"
      :headers="headers"
      />
    <user-card
      :dialog="dialogUserCard"
      :selector="userCardSelector"
      @close="closeDialog"
      @returnUser="choiceSelector($event)"
      :user="user"
      :token="token"
    />
  </div>
</template>

<script>
// import AdminUserlist from '../../components/AdminSession/AdminUserlist.vue'
import UserToolbar from "../../components/AdminSession/UserToolbar.vue";
import UserCard from "../../components/AdminSession/UserCard.vue";
import UserTable from "../../components/AdminSession/UserTable.vue";
export default {
  data: () => ({
    users: [],
    user: {},
    headers: [
      { text: "Tipo", value: "idType" },
      { text: "Identificación", value: "idNumber" },
      { text: "Nombres", value: "firstName" },
      { text: "Apellidos", value: "lastName" },
      { text: "Habilitado", value: "enable" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    token: "borra este token de User.vue",
    dialogUserCard: false,
    userCardSelector: "", //this one toggle between addUser and editUser
  }),
  components: {
    // AdminUserlist
    UserToolbar,
    UserTable,
    UserCard,
  },
  created() {
    this.getUsers(this.token);
  },
  methods: {
    async getUsers(token) {
      try {
        const response = await fetch(`${this.$url}/api/user/list`, {
          headers: { token },
        });
        const data = await response.json();
        if (response.ok) {
          this.users = data;
        }
      } catch (err) {
        console.error("something is wrong!");
      }
    },

    choiceSelector(userSaved) {
      switch (this.userCardSelector) {
        case "edit":
          this.editUser(userSaved);
          break;
        case "add":
          this.addUser(userSaved);
          break;
      }
      this.closeDialog();
    },

    editUser(userUpdated) {
      const index = this.users.findIndex((user) => user.id === userUpdated.id);
      if (index >= 0) {
        Object.assign(this.users[index], userUpdated);
      }
    },

    addUser(userSaved) {
      this.users.push(userSaved);
    },

    setUser(user) {
      this.user = user;
    },

    openUserCard(user) {
      this.userCardSelector = Object.keys(user).length === 0 ? "add" : "edit";
      this.setUser(user);
      this.dialogUserCard = true;
    },
    closeDialog() {
      this.dialogUserCard = false;
    },
  },
};
</script>
