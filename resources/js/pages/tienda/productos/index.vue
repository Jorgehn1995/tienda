<template>
    <div>
        <v-card tile>
            <v-card-text>
                <busqueda-text-field
                    :elevation="0"
                    prefix="productos_search"
                    class="mt-2"
                >
                    <v-btn
                        dark
                        block
                        color="teal"
                        to="/tienda/productos/editar"
                        v-shortkey="['ctrl', 'l']"
                        :loading="isLoading"
                    >
                        Agregar [CTRL+A]
                        <v-icon right>mdi-plus</v-icon>
                    </v-btn>
                </busqueda-text-field>
            </v-card-text>
        </v-card>

        <v-container>
            <div class="d-flex flex-grow-1 flex-column">
                <v-row class="flex-grow-0" dense>
                    <v-col cols="12">
                        <t-listar
                            ref="tabla"
                            tableID="actividades.profesores"
                            prefix="productos_"
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
                            :toolbar="false"
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
                                <v-card-title>
                                    <a
                                        class="undertext black--text font-weight-bold text-decoration-none"
                                        :href="
                                            '/tienda/productos/' +
                                            item.idproducto
                                        "
                                    >
                                        {{ item.nombre }} {{ item.dimension }}
                                    </a>
                                </v-card-title>
                                <v-card-subtitle>
                                    <strong>
                                        {{ item.marca }}
                                    </strong>
                                </v-card-subtitle>
                                <v-card-text class="px-2">
                                    <v-row dense style="height: 100%">
                                        <v-col cols="4" md="4">
                                            <a
                                                class="text-left undertext teal--text font-weight-bold text-decoration-none"
                                                style="width: 100%"
                                                :href="
                                                    '/tienda/productos/' +
                                                    item.idproducto
                                                "
                                            >
                                                <v-icon>mdi-barcode</v-icon>
                                                <span>{{ item.codigo }}</span>
                                            </a>
                                        </v-col>
                                        <v-col cols="4" md="4">
                                            <v-chip
                                                color="green--text"
                                                class="v-chip--active"
                                                dark
                                                small
                                                v-if="item.existencia > 0"
                                            >
                                                {{ item.existencia }}
                                                {{ item.unidades }}
                                            </v-chip>
                                            <v-chip v-else small>
                                                {{ item.existencia }}
                                                {{ item.unidades }}
                                            </v-chip>
                                        </v-col>
                                        <v-col cols="4" md="4"> </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        outlined
                                        color="green"
                                        :to="
                                            '/tienda/productos/existencias?productos_search=id:' +
                                            item.idproducto
                                        "
                                    >
                                        <v-icon left
                                            >mdi-package-variant-closed-plus</v-icon
                                        >
                                    </v-btn>

                                    <v-btn
                                        outlined
                                        :to="
                                            '/tienda/productos/editar?id=' +
                                            item.idproducto
                                        "
                                    >
                                        <v-icon left>mdi-pencil-outline</v-icon>
                                    </v-btn>

                                    <v-options
                                        :title="item.nombre"
                                        icon="mdi-dots-horizontal"
                                    >
                                        <template v-slot:activator="{ open }">
                                            <v-btn outlined @click="open">
                                                <v-icon left>
                                                    mdi-dots-horizontal
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <template v-slot:options>
                                            <v-list-item>
                                                <v-list-item-title>
                                                    Ver Producto
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>
                                                    Imprimir
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item
                                                :to="
                                                    '/tienda/productos/existencias?productos_search=idproducto:' +
                                                    item.idproducto
                                                "
                                            >
                                                <v-list-item-title>
                                                    Agregar Existencias
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-title>
                                                    Revisar Vencimientos
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item
                                                :to="
                                                    '/tienda/productos/editar?id=' +
                                                    item.idproducto
                                                "
                                            >
                                                <v-list-item-title>
                                                    Editar
                                                </v-list-item-title>
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
                            </template>
                        </t-listar>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import BusquedaTextField from "../../../components/busqueda/busquedaTextField.vue";
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import VOptions from "../../../components/tienda/generales/v-options.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

import { mapActions } from "vuex";
export default {
    components: {
        TListar,
        VOptions,
        ProductosMostrarPrecio,
        BusquedaTextField,
    },

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

<style>
.undertext {
    cursor: pointer;
    display: inline-block;
    border-bottom: 1px dashed transparent;
}
.undertext:hover {
    border-bottom: 1px dashed;
}
</style>
