<template>
    <v-app>
    <v-app-bar
      absolute
      color="purple lighten-2"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Parroquia San Martín de Tours</v-toolbar-title>

    </v-app-bar>
    <div class="mt-16">
    <router-view/>
    </div>
    <v-row>
        <v-col
        cols="9"
        >
        </v-col>
        <v-col
        cols="3"
        >
        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        >
        <template v-slot:prepend>
            <v-list-item two-line>

            <v-list-item-content>
                <v-list-item-title>Angie Alonso</v-list-item-title>
                <v-list-item-subtitle>Administrateure</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list dense>
            <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            >
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        </v-col>
    </v-row>
    </v-app>
</template>

<script>
    export default {
        data () {
        return {
          drawer:false,
          items: [
            { title: 'Home', icon: 'mdi-home',to:'/admin' },
            { title: 'Personas registradas', icon: 'mdi-account-group-outline',to:'/admin/users'},
            { title: 'Servicios', icon: 'mdi-application-settings',to:'/admin/services' },
          ],
        }
        },
    }
</script>