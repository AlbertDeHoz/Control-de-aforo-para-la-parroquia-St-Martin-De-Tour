<template>
        <v-app>
        <v-container>
        <v-card
            elevation="4"
            max-width="470px"
            class="mx-auto blue-grey darken-4"
        >
            <v-img  class ="mx-auto" width="250" src="../../assets/error.png"></v-img>
            <v-card-title class="mx-auto blue-grey--text text--lighten-5 text-h4">Lo sentimos, usted no pudo ser registrado</v-card-title>
            <v-card-subtitle class="mx-auto blue-grey--text text--lighten-0 text-h6">Registro sin éxito</v-card-subtitle>
            <v-card-text class="px-5 blue-grey--text text--lighten-3">
                Debido a la situación actual, estamos tomando todas las precauciones posibles y le invitamos a que haga lo mismo. 
                Por favor, diríjase a la unidad de atención más cercana, lo más pronto posible.
            </v-card-text>
            <v-card-actions>
            <v-btn
            class="mx-auto grey--text text--darken-4"
            to="/"
            >
                volver al formulario
            </v-btn>

            </v-card-actions>
        </v-card>
        </v-container>
    </v-app>
</template>