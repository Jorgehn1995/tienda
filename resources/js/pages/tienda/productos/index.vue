<template>
    <div>
        <v-container>
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
                            :show_menu="true"
                            :pagination="50"
                        >
                            <template
                                v-slot:toolbar.name="{ reload, isReloading }"
                            >
                                <div class="d-flex d-flex-column align-center">
                                    <div class="mr-1">Productos</div>
                                    <v-btn
                                        color="primary"
                                        class="ml-2"
                                        to="/tienda/productos/editar"
                                    >
                                        <v-icon left>mdi-plus</v-icon>
                                        Crear
                                    </v-btn>
                                </div>
                            </template>

                            <template
                                v-slot:item="{
                                    isSelected,
                                    toggle,
                                    item,
                                    index,
                                }"
                            >
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
                                                    '/tienda/productos/editar?codigo=' +
                                                    item.codigo
                                                "
                                            >
                                                <v-list-item-title
                                                    >Editar</v-list-item-title
                                                >
                                            </v-list-item>
                                            <v-divider></v-divider>
                                            <v-list-item
                                                :to="
                                                    '/tienda/productos/eliminar?id=' +
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
                                        '/tienda/productos/editar?codigo=' +
                                        item.codigo
                                    "
                                    :ripple="false"
                                >
                                    <v-list class="pt-0">
                                        <v-list-item>
                                            <v-list-item-content class="pt-0">
                                                <v-list-item-subtitle>
                                                    <v-icon left small
                                                        >mdi-package-variant-closed</v-icon
                                                    >
                                                    {{
                                                        item.existencia
                                                    }}
                                                    unidades en existencia
                                                </v-list-item-subtitle>
                                                <v-list-item-subtitle>
                                                    <v-icon left small
                                                        >mdi-text-box-outline</v-icon
                                                    >
                                                    Q{{ item.costo }} costo
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <v-card-text>
                                        <v-card
                                            v-for="(precio, i) in item.precios"
                                            :key="'prec' + i"
                                            outlined
                                            tile
                                        >
                                            <v-card-text>
                                                <v-row>
                                                    <v-col
                                                        cols="12"
                                                        class="d-flex justify-center align-center"
                                                    >
                                                        <div
                                                            class="d-flex flex-column justify-center align-center"
                                                        >
                                                            <span
                                                                class="text-capitalize"
                                                            >
                                                                {{
                                                                    precio.cantidad
                                                                }}
                                                                Unidades
                                                            </span>
                                                            <span
                                                                class="headline black--text"
                                                            >
                                                                <div
                                                                    v-if="
                                                                        precio.nombre ==
                                                                        'Unidad'
                                                                    "
                                                                >
                                                                    <span
                                                                        class="subtitle"
                                                                        >Unidad</span
                                                                    >
                                                                    Q{{
                                                                        precio.precio
                                                                    }}
                                                                </div>
                                                                <div v-else>
                                                                    <span
                                                                        v-if="
                                                                            precio.nombre
                                                                        "
                                                                    >
                                                                        {{
                                                                            precio.nombre
                                                                        }}
                                                                        por Q{{
                                                                            precio.precio
                                                                        }}
                                                                    </span>
                                                                    <span
                                                                        v-else
                                                                    >
                                                                        {{
                                                                            precio.cantidad
                                                                        }}
                                                                        por Q{{
                                                                            precio.precio
                                                                        }}
                                                                    </span>
                                                                </div>
                                                            </span>
                                                        </div>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-card-text>
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
            id: "idproducto",
            ruta: "/productos",
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
