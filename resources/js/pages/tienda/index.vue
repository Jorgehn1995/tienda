<template>
    <v-container>
        <v-row dense>
            <v-col cols="12">
                <v-card
                    class="rounded-lg"
                    color="#fefcfd"
                    elevation="0"
                    outlined
                >
                    <v-card-text>
                        <v-img
                            src="/images/LOGO.jpg"
                            contain
                            height="300"
                        ></v-img>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3" v-if="tipo == 1">
                <v-card color="purple darken-2" dark to="/tienda/productos">
                    <v-card-title>Productos</v-card-title>
                    <v-card-text>Administra los productos </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card color="primary " dark to="/tienda/vender">
                    <v-card-title>VENDER</v-card-title>
                    <v-card-text>Realiza ventas de tus productos</v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="3">
                <v-card color="green " dark to="/tienda/reportes">
                    <v-card-title>Reportes</v-card-title>
                    <v-card-text>Revisa los reportes de tus ventas</v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="3" v-if="tipo == 1">
                <v-card color="grey darken-1" dark to="/tienda/usuarios">
                    <v-card-title>Usuarios</v-card-title>
                    <v-card-text>Administra los usuarios </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card color="grey" dark to="/tienda/productos/verificador">
                    <v-card-title>Verificador de Precios</v-card-title>
                    <v-card-text
                        >Verifica los precios de los productos</v-card-text
                    >
                </v-card>
            </v-col>
            <v-col cols="12" md="3" v-if="tipo == 1 && false">
                <v-card color="blue darken-2" dark to="/tienda/clientes">
                    <v-card-title>Clientes</v-card-title>
                    <v-card-text>Administra los clientes </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    computed: {
        tipo() {
            return this.$cookie.get("tipo");
        },
    },
};
</script>

<style></style>
