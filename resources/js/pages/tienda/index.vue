<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            :permanent="$vuetify.breakpoint.mdAndUp"
            app
        >
            <template v-slot:prepend>
                <v-card tile>
                    <v-card-text>
                        <v-list-item>
                            <v-list-item-action
                                v-if="!$vuetify.breakpoint.mdAndUp"
                            >
                                <v-btn icon @click="drawer = !drawer">
                                    <v-icon>mdi-chevron-left</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-subtitle>
                                    {{ moment().format("D/M/Y") }}
                                </v-list-item-subtitle>
                                <v-list-item-title class="text-h6">
                                    Nombre Tienda
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    Sistema Lerniz
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                </v-card>
                <v-divider></v-divider>
            </template>
            <v-list>
                <v-list-item to="/tienda" active-class="primary--text">
                    <v-list-item-icon>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Inicio</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/tienda/turnos">
                    <v-list-item-icon>
                        <v-icon>mdi-sun-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Turnos</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-cart-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Vender</v-list-item-title>
                </v-list-item>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-account-circle-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Usuarios</v-list-item-title>
                </v-list-item>

                <v-list-group
                    no-action
                    prepend-icon="mdi-package-variant-closed"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Productos</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Ver Productos</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-package-variant-closed-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Agregar Existencias
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-calendar-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Revisar Vencimientos
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group
                    no-action
                    prepend-icon="mdi-package-variant-closed"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Cajas</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Listar Cajas</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-package-variant-closed-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                            Habilitar/Deshabilitar Caja
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-item link>
                    <v-list-item-icon>
                        <v-icon>mdi-sun-clock-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title> Turnos</v-list-item-title>
                </v-list-item>
                <v-list-group
                    no-action
                    prepend-icon="mdi-package-variant-closed"
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Reportes</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Ventas</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Productos</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-clipboard-list-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Cajas</v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-package-variant-closed-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Usuarios </v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon>
                            <v-icon>mdi-package-variant-closed-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title> Vencimientos </v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card class="rounded-lg" elevation="0" outlined>
                        <v-card-text>
                            <v-img
                                src="/images/LOGO.jpg"
                                contain
                                height="200"
                            ></v-img>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" v-if="tipo == 1">
                    <v-card
                        color="teal "
                        dark
                        class="rounded-lg"
                        outlined
                        elevation="0"
                    >
                        <v-card-title>Productos</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="px-0 pt-0">
                            <v-list color="transparent">
                                <v-list-item to="/tienda/productos">
                                    <v-list-item-icon>
                                        <v-icon
                                            >mdi-package-variant-closed</v-icon
                                        >
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Productos
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa los productos ingresados en
                                            tu tienda
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item to="/tienda/productos/existencias">
                                    <v-list-item-icon>
                                        <v-icon>
                                            mdi-package-variant-closed-plus
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Agregar Existencia
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    to="/tienda/productos/vencimientos"
                                >
                                    <v-list-item-icon>
                                        <v-icon> mdi-calendar-clock </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Revisar Vencimientos
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card
                        color="teal darken-1"
                        dark
                        class="rounded-lg"
                        outlined
                        elevation="0"
                    >
                        <v-card-title>Cajas</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="px-0 pt-0">
                            <v-list color="transparent">
                                <v-list-item to="/tienda/cajas">
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart-variant</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Cajas
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa los productos ingresados en
                                            tu tienda
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item to="/tienda/cajas/habilitar">
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Habilitar/Deshabilitar Caja
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item :to="'/tienda/cajas/' + CASH_CODE">
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas de Caja
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa todas las ventas de la caja
                                            actual
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item :to="'/tienda/cajas/' + CASH_CODE">
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas Turno Actual
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa todas las ventas de la caja
                                            actual
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" md="4">
                    <v-card
                        color="teal darken-1"
                        dark
                        class="rounded-lg"
                        outlined
                        elevation="0"
                    >
                        <v-card-title>Ventas</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="px-0 pt-0">
                            <v-list color="transparent">
                                <v-list-item to="/tienda/vender/cajas">
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart-variant</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Realizar Venta
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa los productos ingresados en
                                            tu tienda
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item :to="'/tienda/ventas/'">
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas de la Caja
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon> mdi-finance </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas por Fecha
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card
                        color="teal lighten-1"
                        dark
                        class="rounded-lg"
                        outlined
                        elevation="0"
                        to="/tienda/productos"
                    >
                        <v-card-title>Usuarios</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="px-0 pt-0">
                            <v-list color="transparent">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart-variant</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Lista de Usuarios
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa los productos ingresados en
                                            tu tienda
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Agregar Usuario
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon> mdi-finance </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Suspender Usuario
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card
                        color="teal darken-2"
                        dark
                        class="rounded-lg"
                        outlined
                        elevation="0"
                        to="/tienda/productos"
                    >
                        <v-card-title>Complementos</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="px-0 pt-0">
                            <v-list color="transparent">
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart-variant</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Realizar Venta
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Revisa los productos ingresados en
                                            tu tienda
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon> mdi-safe </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas de la Caja
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-icon>
                                        <v-icon> mdi-finance </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Ventas por Fecha
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            Agrega existencias a los productos
                                            existentes
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="2">
                    <v-card
                        color="primary lighten-1 "
                        dark
                        to="/tienda/reportes"
                    >
                        <v-card-title>Reportes</v-card-title>
                        <v-card-text
                            >Revisa los reportes de tus ventas</v-card-text
                        >
                    </v-card>
                </v-col>

                <v-col cols="12" md="2" v-if="tipo == 1">
                    <v-card color="grey darken-1" dark to="/tienda/usuarios">
                        <v-card-title>Usuarios</v-card-title>
                        <v-card-text>Administra los usuarios </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="2">
                    <v-card
                        color="grey"
                        dark
                        to="/tienda/productos/verificador"
                    >
                        <v-card-title>Verificador de Precios</v-card-title>
                        <v-card-text
                            >Verifica los precios de los productos</v-card-text
                        >
                    </v-card>
                </v-col>
                <v-col cols="12" md="2" v-if="tipo == 1 && false">
                    <v-card color="blue darken-2" dark to="/tienda/clientes">
                        <v-card-title>Clientes</v-card-title>
                        <v-card-text>Administra los clientes </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from "moment";

export default {
    data: () => ({
        drawer: false,
        moment,
    }),
    computed: {
        tipo() {
            return this.$cookie.get("tipo");
        },
        CASH_CODE() {
            return localStorage.getItem("CASH_CODE");
        },
    },
};
</script>

<style></style>
