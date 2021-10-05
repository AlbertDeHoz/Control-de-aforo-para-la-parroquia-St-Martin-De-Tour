<template>    
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="firstName"
        class="elevation-1"
    >
        <template v-slot:[`item.actions`]="{ item }">

            <v-icon
                small
                class="mr-2"
                :key='item.id'
                @click.stop="$emit('editUser', {...item})"
            >
                mdi-pencil
            </v-icon>
            
            <!-- esta parte es el edit enable -->

            <!-- <v-icon
                v-if="item.enable===true"
                medium
                class="mr-2 blue--text"
                @click="setDisable(item)"
            >
                mdi-toggle-switch
            </v-icon>
            <v-icon
                v-if="item.enable===false"
                medium
                class="mr-2 red--text"
                @click="setEnable(item)"
            >
                mdi-toggle-switch-off
            </v-icon>
            <v-icon
                v-if="item.enable===null"
                medium
                class="mr-2"
                @click="setDisable(item)"
            >
                mdi-toggle-switch-off-outline
            </v-icon>
            <v-icon
                v-if="item.enable!==null"
                small
                class="mr-2"
                @click="setNull(item)"
            >
                mdi-eraser
            </v-icon> -->

        </template>
    </v-data-table>
</template>
<script>

export default {
    props:{
        users:Array,
        headers:Array
    },
    data: () => ({

    }),

    methods: {

    }
}
</script>