<template>
    <v-app>
        <v-row>
            <v-col
            cols="9"
            >
            <router-view/>
            </v-col>
            <v-col
            cols="3"
            >
            <v-navigation-drawer
            absolute
            right
            >
            <template v-slot:prepend>
                <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                </v-list-item-avatar>

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
            items: [
            { title: 'Personas registradas', icon: 'mdi-home-city',to:'/admin/userlist'},
            { title: 'My Account', icon: 'mdi-account',to:'/question' },
            { title: 'Users', icon: 'mdi-account-group-outline',to:'/auth' },
            ],
        }
        },
    }
</script>