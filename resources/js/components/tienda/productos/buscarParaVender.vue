<template>
    <div>
        <productos-buscador
            :elevation="0"
            @porcodigo="agregarProducto"
            @portexto="seleccionarProducto"
            @suma="$emit('suma', $event)"
            @multi="$emit('multi', $event)"
        ></productos-buscador>
        <v-dialog v-model="isSelectable" fullscreen scrollable>
            <v-card>
                <v-card-actions @click="isSelectable = false">
                    <v-btn icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <span>Seleccione el producto (Click aqui para cerrar)</span>
                </v-card-actions>
                <v-card-text>
                    <v-row dense>
                        <v-col
                            cols="12"
                            v-for="(producto, i) in listaTexto"
                            :key="'buv' + i"
                        >
                            <v-card
                                outlined
                                elevation="0"
                                outlined
                                class="white--text"
                                @click="agregarProducto(producto)"
                            >
                                <v-card-text>
                                    <v-row dense>
                                        <v-col cols="12" sm="8">
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <v-list-item-subtitle>
                                                        Código:
                                                        {{ producto.codigo }}
                                                    </v-list-item-subtitle>
                                                    <v-list-item-title
                                                        class="text-h5"
                                                    >
                                                        {{ producto.nombre }}
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-col>
                                        <v-col cols="12" sm="4">
                                            <productos-mostrar-precio
                                                class="green--text"
                                                :precio="producto.precio"
                                                :ocultar_cantidad="true"
                                                :cantidad="1"
                                            ></productos-mostrar-precio>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import ProductosMostrarPrecio from "./productosMostrarPrecio.vue";
import ProductosBuscador from "./productosBuscador.vue";
export default {
    components: { ProductosBuscador, ProductosMostrarPrecio },
    data: () => ({
        isLoading: false,
        producto: {
            codigo: "",
            nombre: "",
            cantidad: 1,
            precio: 0,
            total: 0,
            producto: {},
        },
        listaTexto: [],
        isSelectable: false,
    }),
    methods: {
        seleccionarProducto(e) {
            this.listaTexto = e;
            this.isSelectable = true;
        },
        agregarProducto(e) {
            if (!e) {
                return "";
            }
            this.isSelectable = false;
            this.listaTexto = [];
            let p = JSON.parse(JSON.stringify(this.producto));

            p.codigo = e.codigo;
            p.nombre = e.nombre;
            p.cantidad = 1;
            p.precio = parseFloat(e.precio).toFixed(2);
            p.carrito = e.codigo + "-" + p.precio;
            p.producto = e;
            p.descuentos = [];

            this.$emit("producto", p);
        },
    },
};
</script>

<style></style>
