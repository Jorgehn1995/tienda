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
                        color="primary"
                        large
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
            <div v-if="search" class="d-flex flex-grow-1 flex-column">
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
                            :lg="12"
                            :md="12"
                            :sm="12"
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
                                    <div class="d-flex">
                                        <div style="min-width: 100px">
                                            <v-icon>mdi-barcode</v-icon>
                                            <span>{{ item.codigo }}</span>
                                        </div>
                                        <div class="px-2">|</div>
                                        <strong>
                                            {{ item.marca }}
                                        </strong>
                                    </div>
                                </v-card-subtitle>
                                <v-card-text>
                                    <productos-existencias
                                        :costo="item.costo"
                                        :precio_unitario="item.precio"
                                        ref="precios"
                                        v-model="item.precios"
                                        :existencia="item.existencia"
                                    ></productos-existencias>
                                    <v-row dense>
                                        <v-col cols="12" sm="6">
                                            <v-card
                                                class="rounded-lg"
                                                color="teal lighten-5 "
                                                outlined
                                            >
                                                <v-list color="transparent">
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle
                                                                class="teal--text text--darken-3"
                                                            >
                                                                Existencia
                                                                Actual
                                                            </v-list-item-subtitle>
                                                            <v-list-item-title
                                                                class="text-right teal--text text--darken-3"
                                                            >
                                                                {{
                                                                    item.existencia
                                                                }}
                                                                {{
                                                                    item.unidades
                                                                }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-col>
                                        <v-col cols="12" sm="6">
                                            <v-card
                                                class="rounded-lg"
                                                color="blue lighten-5 "
                                                outlined
                                            >
                                                <v-list color="transparent">
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-subtitle
                                                                class="blue--text text--darken-3"
                                                            >
                                                                Ultima
                                                                Actualización:
                                                            </v-list-item-subtitle>
                                                            <v-list-item-title
                                                                class="text-right blue--text text--darken-3"
                                                            >
                                                                {{
                                                                    moment(
                                                                        item.updated_at
                                                                    ).format(
                                                                        "D/MM/Y [a las] hh:mm:ss a"
                                                                    )
                                                                }}
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        @click="agregarExistencias(item)"
                                        large
                                        outlined
                                        color="primary"
                                        :loading="isSaving"
                                    >
                                        <v-icon left> mdi-content-save </v-icon>
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </template>
                        </t-listar>
                    </v-col>
                </v-row>
            </div>
            <v-card v-else elevation="0" class="rounded-lg">
                <v-card-text>
                    <div
                        class="d-flex justify-center align-center flex-column"
                        style="height: calc(100vh - 300px)"
                    >
                        <v-icon size="100" class="grey--text">
                            mdi-tag-search-outline
                        </v-icon>
                        <br />
                        <span>
                            Busca un producto por codigo o por descripción
                        </span>
                    </div>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import ProductosExistencias from "../../../components/tienda/productos/productosExistencias.vue";
import BusquedaTextField from "../../../components/busqueda/busquedaTextField.vue";
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import VOptions from "../../../components/tienda/generales/v-options.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

import { mapActions } from "vuex";
import moment from "moment";
export default {
    components: {
        TListar,
        VOptions,
        ProductosMostrarPrecio,
        BusquedaTextField,
        ProductosExistencias,
    },

    mounted() {
        //this.init();
    },
    data: () => ({
        isLoading: false,
        isSaving: false,
        seleccion: [],
        ajustes: {
            id: "idproducto",
            ruta: "/productos",
            buscar: "",
        },
        moment: moment,
    }),
    methods: {
        async agregarExistencias(item) {
            this.isSaving = true;
            await this.$axios
                .post("/productos", item)
                .then((result) => {
                    item.existencia = result.data.existencia;
                    item.updated_at = result.data.updated_at;
                    item.precios.forEach((p) => {
                        p.stock_nuevo = 0;
                        p.costo_nuevo = 0;
                        p.vencimiento = "";
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isSaving = false;
        },
    },
    computed: {
        extraQuery() {
            return "";
        },
        search() {
            return this.$route.query["productos_search"];
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
