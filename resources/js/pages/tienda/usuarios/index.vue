<template>
    <div>
        <v-container>
            <div class="d-flex flex-column justify-start mb-2">
                <h1>Usuarios</h1>
                <span class="subtitle-2 mb-2">
                    Administra los usuarios que tendrán acceso a tu sistema de
                    ventas
                </span>

                <v-btn
                    color="primary"
                    to="/tienda/usuarios/crear"
                    max-width="200"
                    :block="$vuetify.breakpoint.xsOnly"
                >
                    <v-icon left>mdi-account-plus</v-icon>
                    Registrar Usuario
                </v-btn>
            </div>
            <div class="d-flex flex-grow-1 flex-column">
                <v-row class="flex-grow-0" dense>
                    <v-col cols="12">
                        <t-listar
                            ref="tabla"
                            tableID="actividades.profesores"
                            prefix="usuarios_"
                            show-select
                            show-expand
                            toggle-columns
                            :extraQuery="extraQuery"
                            :apiURL="ajustes.ruta"
                            :itemID="ajustes.id"
                            :buscar="ajustes.buscar"
                            @update:search="ajustes.buscar = $event"
                            @click:row="ver($event)"
                            @update:seleccion="seleccion = $event"
                            :truncate="true"
                            :toolbar="false"
                            :show_menu="true"
                            :pagination="12"
                            :sm="12"
                            :md="12"
                            :lg="12"
                        >
                            <template
                                v-slot:item="{
                                    isSelected,
                                    toggle,
                                    item,
                                    index,
                                }"
                            >
                                <v-card
                                    elevation="0"
                                    v-if="$vuetify.breakpoint.smAndUp"
                                    class="mb-2"
                                >
                                    <v-card-text>
                                        <v-row dense>
                                            <v-col cols="12" sm="4">
                                                <div
                                                    class="d-flex align-center"
                                                >
                                                    <h4 class="text-h6">
                                                        {{ item.nombre }}
                                                    </h4>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" sm="4">
                                                <div
                                                    class="d-flex align-center"
                                                >
                                                    <h5 class="subtitle-1">
                                                        {{ item.usuario }}
                                                    </h5>
                                                </div>
                                            </v-col>
                                            <v-col cols="12" sm="4">
                                                <div
                                                    class="d-flex justify-space-between align-center"
                                                >
                                                    <div>
                                                        <v-chip
                                                            color="green--text"
                                                            class="v-chip--active"
                                                            small
                                                            v-if="
                                                                item.tipo == 1
                                                            "
                                                        >
                                                            <v-icon small left
                                                                >mdi-shield-key-outline</v-icon
                                                            >
                                                            Administrador
                                                        </v-chip>
                                                        <v-chip
                                                            color="blue--text"
                                                            class="v-chip--active"
                                                            small
                                                            v-else
                                                        >
                                                            <v-icon small left
                                                                >mdi-shield-key-outline</v-icon
                                                            >
                                                            Vendedor
                                                        </v-chip>
                                                    </div>
                                                    <div>
                                                        <v-options
                                                            :title="item.nombre"
                                                        >
                                                            <template
                                                                v-slot:options
                                                            >
                                                                <v-list-item
                                                                    :to="
                                                                        '/tienda/usuarios/editar?id=' +
                                                                        item.idusuario
                                                                    "
                                                                >
                                                                    <v-list-item-title
                                                                        >Editar</v-list-item-title
                                                                    >
                                                                </v-list-item>
                                                                <v-divider></v-divider>
                                                                <v-list-item
                                                                    :to="
                                                                        '/tienda/usuarios/eliminar?id=' +
                                                                        item.idusuario
                                                                    "
                                                                >
                                                                    <v-list-item-title
                                                                        class="red--text"
                                                                    >
                                                                        Eliminar
                                                                    </v-list-item-title>
                                                                </v-list-item>
                                                            </template>
                                                        </v-options>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <v-card elevation="0" v-else>
                                    <v-card-actions class="pb-0">
                                        <v-card-title
                                            class="pb-0 pl-1 pt-1"
                                            :title="item.nombre"
                                            style="width: 100%; display: block"
                                        >
                                            <div class="text-truncate">
                                                {{ item.nombre }}
                                            </div>
                                        </v-card-title>

                                        <v-spacer></v-spacer>

                                        <v-options :title="item.nombre">
                                            <template v-slot:options>
                                                <v-list-item
                                                    :to="
                                                        '/tienda/usuarios/editar?id=' +
                                                        item.idusuario
                                                    "
                                                >
                                                    <v-list-item-title
                                                        >Editar</v-list-item-title
                                                    >
                                                </v-list-item>
                                                <v-divider></v-divider>
                                                <v-list-item
                                                    :to="
                                                        '/tienda/usuarios/eliminar?id=' +
                                                        item.idusuario
                                                    "
                                                >
                                                    <v-list-item-title
                                                        class="red--text"
                                                    >
                                                        Eliminar
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </template>
                                        </v-options>
                                    </v-card-actions>
                                    <v-card
                                        elevation="0"
                                        class="rounded-lg"
                                        :to="
                                            'tienda/usuarios/' + item.idcliente
                                        "
                                        :ripple="false"
                                    >
                                        <v-list class="pt-0">
                                            <v-list-item>
                                                <v-list-item-content
                                                    class="pt-0"
                                                >
                                                    <v-list-item-subtitle>
                                                        <v-icon left small
                                                            >mdi-account-circle-outline</v-icon
                                                        >
                                                        {{ item.usuario }}
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle>
                                                        <v-icon left small
                                                            >mdi-phone-outline</v-icon
                                                        >
                                                        {{ item.telefono }}
                                                    </v-list-item-subtitle>
                                                    <v-list-item-subtitle>
                                                        <v-chip
                                                            color="green--text"
                                                            class="v-chip--active"
                                                            small
                                                            v-if="
                                                                item.tipo == 1
                                                            "
                                                        >
                                                            <v-icon small left
                                                                >mdi-shield-key-outline</v-icon
                                                            >
                                                            Administrador
                                                        </v-chip>
                                                        <v-chip
                                                            color="blue--text"
                                                            class="v-chip--active"
                                                            small
                                                            v-else
                                                        >
                                                            <v-icon small left
                                                                >mdi-shield-key-outline</v-icon
                                                            >
                                                            Vendedor
                                                        </v-chip>
                                                    </v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-card>
                            </template>
                        </t-listar>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import VOptions from "../../../components/tienda/generales/v-options.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

import { mapActions } from "vuex";
export default {
    components: { TListar, VOptions },

    mounted() {
        //this.init();
    },
    data: () => ({
        isLoading: false,
        seleccion: [],
        ajustes: {
            id: "idusuario",
            ruta: "/usuarios",
            buscar: "",
        },
    }),
    methods: {},
    computed: {
        extraQuery() {
            return "";
        },
    },
};
</script>

<style></style>
