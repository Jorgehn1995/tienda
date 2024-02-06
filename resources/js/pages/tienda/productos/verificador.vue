<template>
    <div>
        <productos-buscador
            ref="buscador"
            @porcodigo="data = [$event]"
            @portexto="data = $event"
        ></productos-buscador>
        <v-row dense>
            <v-col
                cols="12"
                md="6"
                v-for="(item, index) in data"
                :key="'pdocv' + index"
                :offset-md="index == 0 ? offset : ''"
            >
                <v-card class="rounded-lg" elevation="0" outlined height="100%">
                    <v-card-title class="pb-1">
                        <v-icon left>mdi-barcode</v-icon>
                        {{ item.codigo }}

                        <v-spacer></v-spacer>
                        <v-btn
                            rounded
                            large
                            text
                            outlined
                            color="primary"
                            @click="imprimirBarcode(item, precio)"
                        >
                            <v-icon>mdi-barcode</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-divider inset></v-divider>
                    <v-card-text>
                        <p
                            style="font-family: 'Roboto'; font-size: 2em"
                            class="mb-0"
                        >
                            {{ item.nombre }}
                            {{ item.marca }}
                            {{ item.dimension }}
                        </p>
                    </v-card-text>
                    <v-card-text>
                        <v-row dense>
                            <v-col
                                cols="12"
                                md="6"
                                v-for="(precio, i) in item.precios"
                                :key="'prev' + i"
                            >
                                <v-card outlined class="mt-1" tile>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>

                                        <v-btn
                                            rounded
                                            large
                                            text
                                            outlined
                                            color="primary"
                                            @click="
                                                imprimirPrecio(item, precio)
                                            "
                                        >
                                            <v-icon>mdi-printer-outline</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                    <v-card-text class="mx-0 mt-n6">
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                class="d-flex justify-center align-center"
                                            >
                                                <productos-mostrar-precio
                                                    :nombre="precio.nombre"
                                                    :cantidad="precio.cantidad"
                                                    :precio="precio.precio"
                                                ></productos-mostrar-precio>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import ProductosBuscador from "../../../components/tienda/productos/productosBuscador.vue";
export default {
    components: { ProductosBuscador, ProductosMostrarPrecio },
    data: () => ({
        isLoading: false,
        data: [],
        nombre_precios: [
            "Unidad",
            "Media Docena",
            "Docena",
            "Ciento",
            "Millar",
        ],
    }),
    methods: {
        imprimirPrecio(item, precio) {
            let data = {
                copias: 1,
                codigo: item.codigo,
                descripcion: item.nombre,
                precio: precio.precio,
                presentacion:
                    precio.cantidad == 1 && !precio.nombre
                        ? "Unitario"
                        : precio.nombre,
                unidades: precio.cantidad,
            };
            this.$axios
                .post("/impresiones/precios", data)
                .then((result) => {
                    this.$refs.buscador.skEnfocarCodigo();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        imprimirBarcode(item) {
            let data = {
                copias: 1,
                codigo: item.codigo,
                descripcion: item.nombre,
            };
            this.$axios
                .post("/impresiones/barcode", data)
                .then((result) => {
                    this.$refs.buscador.skEnfocarCodigo();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        offset() {
            switch (this.data.length) {
                case 1:
                    return 3;
                    break;

                default:
                    return 0;
                    break;
            }
        },
        cols_precios() {
            switch (this.data.length) {
                case 1:
                    return 4;
                    break;
                case 2:
                    return 6;
                    break;

                default:
                    return 12;
                    break;
            }
        },
    },
};
</script>

<style></style>
