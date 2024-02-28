<template>
    <div>
        <v-container>
            <div class="d-flex flex-grow-1 flex-column">
                <v-row class="flex-grow-0" dense>
                    <v-col cols="12">
                        <v-data-table
                            :headers="ajustes.headers"
                            :items="ajustes.items"
                            :sort-by="['calories', 'fat']"
                            :sort-desc="[false, true]"
                            multi-sort
                            class="elevation-1"
                            show-expand
                        >
                            <template v-slot:item.codigo="{ item }">
                                <v-hover v-slot="{ hover }">
                                    <div>
                                        <a
                                            href="#"
                                            class="text-decoration-none text--black"
                                        >
                                            {{ item.codigo }}
                                        </a>
                                    </div>
                                </v-hover>
                            </template>
                            <template v-slot:item.nombre="{ item }">
                                <v-hover v-slot="{ hover }">
                                    <div>
                                        <a
                                            href="#"
                                            class="text-decoration-none"
                                        >
                                            {{ item.nombre }}
                                        </a>
                                    </div>
                                </v-hover>
                            </template>
                            <template v-slot:item.existencia="{ item }">
                                {{ item.existencia }} {{ item.unidades }}
                            </template>
                            <template v-slot:expanded-item="{ headers, item }">
                                <td :colspan="headers.length">
                                    <div class="pa-2">
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                md="3"
                                                class="d-flex justify-center align-center"
                                                v-for="(
                                                    precio, i
                                                ) in item.precios"
                                                :key="'prec' + i"
                                            >
                                                <productos-mostrar-precio
                                                    :nombre="precio.nombre"
                                                    :cantidad="precio.cantidad"
                                                    :precio="precio.precio"
                                                ></productos-mostrar-precio>
                                            </v-col>
                                        </v-row>
                                    </div>
                                </td>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import VOptions from "../../../components/tienda/generales/v-options.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

import { mapActions } from "vuex";

export default {
    components: { TListar, VOptions, ProductosMostrarPrecio },

    mounted() {
        this.getProductos();
    },
    data: () => ({
        isLoading: false,
        seleccion: [],
        ajustes: {
            totalDesserts: 0,
            items: [],
            loading: true,
            options: {},
            headers: [
                {
                    text: "Código",
                    align: "start",
                    sortable: false,
                    value: "codigo",
                },
                { text: "Producto", value: "nombre" },
                { text: "Marca", value: "marca" },
                { text: "Dimensión", value: "dimension" },
                { text: "Existencias", value: "existencia" },
                { text: "Vencimiento", value: "vencimiento" },
                { text: "", value: "data-table-expand" },
            ],
        },
        datos: [],
    }),
    methods: {
        async getProductos() {
            this.isLoading = true;
            await this.$axios
                .get("/productos")
                .then((result) => {
                    this.ajustes.items = result.data;
                    console.log(result.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        extraQuery() {
            return "";
        },
    },
};
</script>

<style></style>
